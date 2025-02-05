<script lang="ts">
    import '../../../app.css';
    import { goto } from '$app/navigation';
    import { userStore, templateDataStore } from '../../../lib/store.js';
    import { onMount } from 'svelte';
    import Quill from 'quill';

    let user: { _id: string; username: string; email: string } | null = null;

    userStore.subscribe(value => {
		user = value;
	});

    let userId: any;
    let formData = {
        businessName: '',
        taglineSlogan: '',
        businessAddress: '',
        phoneNumber: '',
        emailAddress:'',
        defaultHeaderText: '',
        defaultFooterText: '',
        senderName: '',
        senderPosition: ''
    }

    let templateData = {
        documentTitle: '',
        documentType: '',
        documentSize: '',
        tone: '',
        detailsPrompt: '',
        additionalDetails: ''
    }

    onMount(() => {
		const token = localStorage.getItem('token');

		// Clear token to prevent subsequent reloads
		localStorage.removeItem('token');

		if (token) {
			location.reload();
		}
	});

    onMount(async () => {
		try {
			const response = await fetch('/api/login', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data = await response.json();
			console.log(data)

			if (response.ok) {
				// Store the user data in the `user` variable
				console.log(data.user);

                userStore.set(data.user);
                userId = data.user?._id || null;
                console.log(userId);

			} else {
				console.error('Failed to fetch user data:', data.message);
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}

	});


    function navigateToEditing() {
        goto('/editing');
    }

    $: if (userId) {
    fetchData();
}

async function fetchData() {
    try {
        const response = await fetch(`/api/g_details/${userId}`);
        if (!response.ok) {
            console.error('Failed to fetch data:', response.status, await response.text());
            return;
        }

        const data = await response.json();
        formData = { ...formData, ...data };
    } catch (error) {
        console.error('Request failed:', error);
    }
}

function deltaToHtml(delta) {
    const quill = new Quill(document.createElement('div')); // Temporary Quill instance
    quill.setContents(delta);
    return quill.root.innerHTML; // Get formatted HTML
}

async function sendRequest() {
    const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ templateData, formData })
    });

    const data = await response.json();
    const htmlContent = deltaToHtml(data.content);
    console.log(htmlContent); // Logs rich text in HTML format
    sendTemplatetoStore()
}


function sendTemplatetoStore() {
    console.log("saving template data to store");
    console.log(templateData);
  templateDataStore.set(templateData);
}

</script>

<form>
<div class="templates-contents">

    <div class="documents">
        <h1>Custom Document Template</h1>
        <div class="document-wrapper">
            <!--
            <div class="details-logo">
                <h3>Details Included</h3>
                <div class="details-input-checkbox">
                    <input type="checkbox" name="chckMyAddress">
                    <p>Include my Address</p>
                </div>
                <div class="details-input-checkbox">
                    <input type="checkbox" name="chckreceiverAddress">
                    <p>Include Receiver Address</p>
                </div>
                <div class="details-input-text">
                    <p>Receiver Address:</p>
                    <input type="text" name="receiverAddress">
                </div>
                <h3>Logo/s to Use</h3>
                <div class="logo-image-preview">
                    <div class="image-container">
                        <div class="logo-checkbox">
                            <input class="logo-checkbox-over" type="checkbox" name="logo1">
                            <img src="/assets/LogoSample.png" alt="logo">
                        </div>
                        <div class="logo-checkbox">
                            <input class="logo-checkbox-over" type="checkbox" name="logo2">
                            <img src="/assets/LogoSample.png" alt="logo">
                        </div>
                        <div class="logo-checkbox">
                            <input class="logo-checkbox-over" type="checkbox" name="logo3">
                            <img src="/assets/LogoSample.png" alt="logo">
                        </div>
                    </div>
                </div>
            </div>
            -->
            <div class="document-content">
                <h3>Document</h3>
                <div class="document-input">
                    <p>Document Title:</p>
                    <input type="text" name="documentTitle" id="" required bind:value={templateData.documentTitle}>
                </div>
                <div class="document-input">
                    <p>Document Type:</p>
                    <input type="text" name="documentType" id="" required bind:value={templateData.documentType}>
                </div>
                <div class="document-input">
                    <p>Document Size:</p>
                    <select id="tone" name="tone" bind:value={templateData.documentSize}>
                        <option value="letter">Letter</option>
                        <option value="legal">Legal</option>
                        <option value="a4">A4</option>
                    </select>
                </div>
                <br><br><br>
                <p><strong>Disclaimer:</strong> The content generated will rely heavily on the inputs provided by you. We use AI for content generation, so the quality and relevance of the content will depend on your input.</p>
            </div>
        </div>
        
        <br>
    </div>

    <div class="prompt-generate">
        <div class="prompt">
            <div class="prompt-wrapper">
                <h3>Content</h3>
                    <div class="content-input-select">
                        <p>Tone:</p>
                        <select id="tone" name="tone" bind:value={templateData.tone}>
                            <option value="Formal">Formal</option>
                            <option value="Professional">Professional</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Persuasive">Persuasive</option>
                            <option value="Inspirational">Inspirational</option>
                            <option value="Instructional">Instructional</option>
                            <option value="Creative">Creative</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Narrative">Narrative</option>
                            <option value="Empathic">Empathic</option>
                        </select>
                    </div>
                    <div class="content-input-textarea">
                        <p>Details Prompt<br>to AI:</p>
                        <textarea name="detailsPrompt" id="detailsPrompt" bind:value={templateData.detailsPrompt}></textarea>
                    </div>
                    <div class="content-input-textarea">
                        <p>Additional Details:</p>
                        <textarea name="additionalDetails" id="additionalDetails" bind:value={templateData.additionalDetails}></textarea>
                    </div>
            <!--
            <h3>Use Past Document as Preset</h3>
            <div class="preset">
                <p class="document-title">Saved Doucument 1</p>
                <p class="document-type">Document Type</p>
            </div>
            <div class="preset">
                <p class="document-title">Saved Doucument 2</p>
                <p class="document-type">Document Type</p>
            </div>
    
            <div class="preset">
                <p class="document-title">Saved Doucument 3</p>
                <p class="document-type">Document Type</p>
            </div>
            -->
            </div>
        </div>
    
        <button on:click={sendRequest}>Generate Document</button>
    </div>
</div>
</form>




<style>
    *{
        color: #1b1b1b;
    }
    h1 {
        font-family: 'Poppins Bold';
        font-size: 30px;
    }

    h3{
        font-family: 'Telegraf';
        font-size: 24px;
    }

    p {
        font-family: 'SourceSansPro Regular';
        font-size: 18px;
    }

    /*img{
        height: 95px;
        width: min-content;
    }*/

    input[type="text"]{
        width:100%;
        height:30px;
        border: 2px solid #023DFE;
        border-radius:10px;
        padding-left: 10px;
        font-size: 16px;
    }

    /*input[type="checkbox"]{
        width: 20px; 
        height: 20px;
        border-color: #023DFE;
        accent-color: #023DFE;
        border-radius:10px;
        margin-right: 15px;
    }*/

    select{
        width:103%;
        height:33px;
        border: 2px solid #023DFE;
        border-radius:10px;
        padding-left: 10px;
        font-size: 16px;
    }

    textarea{
        width:100%;
        height:113px;
        border: 2px solid #023DFE;
        border-radius:10px;
        padding-left: 10px;
        resize: none;
        font-size: 16px;
    }

    button{
        width: 100%;
        height: 50px;
        font-family: 'SourceSansPro Bold';
        font-size: 20px;
        border: 0px;
        border-radius: 8px;
        background-color: #A0EA00;
        cursor: pointer;
        color: black;
        margin-top: 16px;
        display: block;
        margin-left: auto; 
    }

    button:hover{
        color: #A0EA00;
        background-color: #1b1b1b;
        transition: all 0.3s ease;
    }

    .templates-contents{
        display: flex;
        flex-direction: row;
        margin-left: 30px;
        padding-right: 50px;
    }
    
    /*
    .past-docus h3{
        margin-top: 10px;
    }

    .preset{
        margin-top: 10px;
        margin-left: 20px;
        cursor: pointer;
    }

    .document-title{
        font-family: 'SourceSansPro Bold';
        margin-bottom: 0px;
    }

    .document-type{
        margin-top: 0px;
    }*/

    .documents{
        width: 1015px;
        display: flex;
        flex-direction: column;
    }

    .document-wrapper{
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    
    /*
    .details-logo{
        padding-right: 50px;
        padding-bottom: 20px;
        border-right: 1px solid #1b1b1b;
    }

    .details-logo h3{
        margin-bottom: 5px;
    }

    .details-input-checkbox{
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;

    }

    .details-input-text{
        width: 270px;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 60px;
    }

    .details-input-text p{
        width: 190px;
    }

    .logo-image-preview{
        height: 110px;
        width: 300px;
        padding: 16px;
        background-color: #D9D9D9;
        border-radius: 10px;
        margin-top: 13px;
    }

    .image-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow-y: hidden;
        overflow-x: scroll;
        white-space: nowrap;
        gap: 15px;
        scrollbar-color: #AEAEAE #D9D9D9;
    }

    .logo-checkbox {
        position: relative; 
        display: inline-block;
    }

    .logo-checkbox-over {
        position: absolute;
        top: 5px; 
        left: 5px;
        width: 20px;
        height: 20px;
        accent-color: #023DFE; 
        cursor: pointer;
    }*/

    .document-content{
        width: 100%;
        margin-left: 50px;
    }

    .document-input {
        width: 97%;
        height: 45px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }

    .document-input p{
        width: 200px;
    }

    .prompt-generate{
        width: 100%;
        padding-left: 80px;
    }
    .prompt{
        height: 439px;
        background: #D9D9D9;
        border-radius: 20px;
        margin-bottom: 50px;
    }

    .prompt::after {
        content: '';
        position: absolute;
        bottom: 55px; /* Adjust this value to move the triangle up or down */
        left: 1180px; /* Adjust this value to move the triangle left or right */
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 70px solid #d9d9d9; /* Matches the prompt's background */
    }

    .prompt-wrapper {
        padding: 50px;
    }

    .prompt-wrapper h3{
        margin-top: 0px;
    }

    .content-input-select {
        margin-left: 20px;
        width: 97%;
        height: 28px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .content-input-select p{
        width: 200px;
    }

    .content-input-textarea {
        margin-left: 20px;
        width: 97%;
        height: 120px;
        display: flex;
        flex-direction: row;
        margin-top: 13px;
    }

    .content-input-textarea p{
        width: 200px;
        margin-top: 0px;
    }
</style>