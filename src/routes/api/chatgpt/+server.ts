import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';




export async function POST({ request }) {
    const { templateData, formData } = await request.json();

    const businessName = formData.businessName;
    const taglineSlogan = formData.taglineSlogan;
    const businessAddress = formData.businessAddress;
    const phoneNumber = formData.phoneNumber;
    const emailAddress = formData.emailAddress;
    const defaultHeaderText = formData.defaultHeaderText;
    const defaultFooterText = formData.defaultFooterText;
    const senderName = formData.senderName;
    const senderPosition = formData.senderPosition;

    const documentTitle = templateData.documentTitle;
    const documentType = templateData.documentType;
    const documentSize = templateData.documentSize;
    const tone = templateData.tone;
    const detailsPrompt = templateData.detailsPrompt;
    const additionalDetails = templateData.additionalDetails;


    const prompt = `
        documentType = ${documentType}

        based on the document type given to you, decide which of these variable you need and where will you place them:
        (note: You can choose to not use some variables if not needed)

        businessName = ${businessName}
        businessTagline = ${taglineSlogan}
        businessAddress = ${businessAddress}
        phoneNumber = ${phoneNumber}
        emailAddress = ${emailAddress}
        defaultHeaderText = ${defaultHeaderText}
        defaultFooterText = ${defaultFooterText}
        senderName = ${senderName}
        senderPosition = ${senderPosition}
        
        This are some details about the document you need to make:

        document Title: ${documentTitle}
        details about the document (user prompt): ${detailsPrompt}
        here are some additional notes: ${additionalDetails}
        You will write the document in this tone: ${tone}
        this is the document size so you are aware: ${documentSize}

        Please generate this certain document in HTML format while being concise and without commentary. Use rich text formatting like bold, italic, and hyperlinks where relevant.

        (We are using an API for this please so dont use unneccesary words only the code.)
        `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a Document Content Generator' },
                { role: 'user', content: prompt }
            ]
        })
    });


    const data = await response.json();

    console.log(data.choices[0].message.content);
    return json(data);
}
