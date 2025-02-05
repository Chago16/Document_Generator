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

        While being concise and without commentary, Make a code for this document. Use rich Text Formatting. We are using an API for this please so dont use unneccesary words only the code. This will be pasted in a quill editor, here are the toolbards we set:
            ['bold', 'italic', 'underline', 'strike'],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                ['image'],
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
            base your format on this quill toolbar. 
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
