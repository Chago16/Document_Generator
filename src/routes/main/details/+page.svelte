<script lang="ts">
	import { use } from 'chai';
    import '../../../app.css';
    import { userStore } from '../../../lib/store.js';
    import { onMount } from 'svelte';

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

    let formData2 = {
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
    
    async function saveUserDetails(id: any, formData: any) {
  try {
    const response = await fetch('/api/stored_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, ...formData }) // Send ID and form data
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving user details:', error);
    return { message: 'Request failed' };
  }
}

    async function handleSubmit() {
        const result = await saveUserDetails(userId, formData);
        console.log(formData);
        console.log(result.message); // Show success or error message
        fetchData();
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
        formData2 = { ...formData, ...data };
    } catch (error) {
        console.error('Request failed:', error);
    }
}

let formState = 'form1';

const toggleForm = () => {
    formState = formState === 'form1' ? 'form2' : 'form1';
  };

</script>

<div class="header-save">
    <h1>Common Details Setup</h1>
</div>

<button on:click={toggleForm}>Edit</button>


<form on:submit={handleSubmit}>
<div class="details-wrapper">

    {#if formState === 'form1'}
    <div class="branding-contact">
        <h3 class="headers-h3">Branding Details:</h3>
        <div class="branding-input">
            <p>Business Name:</p>
            <input type="text" name="businessName" id="" required bind:value={formData2.businessName} readonly>
        </div>
        <div class="branding-input">
            <p>Tagline/Slogan:</p>
            <input type="text" name="taglineSlogan" id="" required bind:value={formData2.taglineSlogan} readonly>
        </div>

        <h3 class="headers-h3">Contact Details:</h3>
        <div class="contact-input">
            <p>Business Address:</p>
            <input type="text" name="businessAddress" id="" required bind:value={formData2.businessAddress} readonly>
        </div>
        <div class="contact-input">
            <p>Phone Number:</p>
            <input type="number" name="phoneNumber" id="" required bind:value={formData2.phoneNumber} readonly>
        </div>
        <div class="contact-input">
            <p>Email Address:</p>
            <input type="email" name="emailAddress" id="" required bind:value={formData2.emailAddress} readonly>
        </div>
        <!--
        <div class="branding-input-image">
            <p>Upload Logos</p>
            <div class="buttons-remove-upload">
                <button type="reset" class="remove">Remove</button>
                <button type="button" class="upload">Upload</button>
            </div>
        </div>
        <div class="branding-input-image-preview-wrapper">
            <div class="branding-input-image-preview">
                <div class="image-container">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                </div>
            </div>
        </div> -->
    </div>

    <div class="custom-sender">
        <h3 class="headers-h3">Custom Branding Details:</h3>
        <div class="input-text-areas">
            <div class="custom-input">
                <p>Default Header Text:</p>
                <textarea name="defaultHeaderText" id="" bind:value={formData2.defaultHeaderText} readonly></textarea>
            </div>
            <div class="custom-input">
                <p>Default Footer Text:</p>
                <textarea name="defaultFooterText" id="" bind:value={formData2.defaultFooterText} readonly></textarea>
            </div>
        </div>

        <h3 class="headers-h3">Sender Details:</h3>
        <div class="sender-wrapper">
            <div class="sender-input">
                <p>Sender Name:</p>
                <input type="text" name="senderName" id="" required bind:value={formData2.senderName} readonly>
            </div>
            <div class="sender-input">
                <p>Position:</p>
                <input type="text" name="senderPosition" id="" required bind:value={formData2.senderPosition} readonly>
            </div>
            <!--
            <div class="sender-input-image-wrap">
                <div class="sender-input-image">
                    <p>Signature Upload</p>
                    <button type="button" class="upload">Upload</button>
                    <button type="reset" class="remove">Remove</button>
                </div>
                
                <div class="sender-input-image-preview">
                    <div class="image-container">
                        <img src="/assets/LogoSample.png" alt="logo">
                    </div>
                </div>
                <div class="sender-input-image">
                    <p>Head Shot Picture Upload</p>
                    <button type="button" class="upload">Upload</button>
                    <button type="reset" class="remove">Remove</button>
                </div>
                <div class="sender-input-image-preview">
                    <div class="image-container">
                        <img src="/assets/LogoSample.png" alt="logo">
                    </div>
                </div>
            </div>
            -->
        </div>
        <div class="header-save">
            <button type="submit">Save</button>
        </div>
    </div>
    {:else if formState === 'form2'}
    <div class="branding-contact">
        <h3 class="headers-h3">Branding Details:</h3>
        <div class="branding-input">
            <p>Business Name:</p>
            <input type="text" name="businessName" id="" required bind:value={formData.businessName} placeholder="business name">
        </div>
        <div class="branding-input">
            <p>Tagline/Slogan:</p>
            <input type="text" name="taglineSlogan" id="" required bind:value={formData.taglineSlogan}>
        </div>

        <h3 class="headers-h3">Contact Details:</h3>
        <div class="contact-input">
            <p>Business Address:</p>
            <input type="text" name="businessAddress" id="" required bind:value={formData.businessAddress}>
        </div>
        <div class="contact-input">
            <p>Phone Number:</p>
            <input type="number" name="phoneNumber" id="" required bind:value={formData.phoneNumber}>
        </div>
        <div class="contact-input">
            <p>Email Address:</p>
            <input type="email" name="emailAddress" id="" required bind:value={formData.emailAddress}>
        </div>
        <!--
        <div class="branding-input-image">
            <p>Upload Logos</p>
            <div class="buttons-remove-upload">
                <button type="reset" class="remove">Remove</button>
                <button type="button" class="upload">Upload</button>
            </div>
        </div>
        <div class="branding-input-image-preview-wrapper">
            <div class="branding-input-image-preview">
                <div class="image-container">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                    <img src="/assets/LogoSample.png" alt="logo">
                </div>
            </div>
        </div> -->
    </div>

    <div class="custom-sender">
        <h3 class="headers-h3">Custom Branding Details:</h3>
        <div class="input-text-areas">
            <div class="custom-input">
                <p>Default Header Text:</p>
                <textarea name="defaultHeaderText" id="" bind:value={formData.defaultHeaderText}></textarea>
            </div>
            <div class="custom-input">
                <p>Default Footer Text:</p>
                <textarea name="defaultFooterText" id="" bind:value={formData.defaultFooterText}></textarea>
            </div>
        </div>

        <h3 class="headers-h3">Sender Details:</h3>
        <div class="sender-wrapper">
            <div class="sender-input">
                <p>Sender Name:</p>
                <input type="text" name="senderName" id="" required bind:value={formData.senderName}>
            </div>
            <div class="sender-input">
                <p>Position:</p>
                <input type="text" name="senderPosition" id="" required bind:value={formData.senderPosition}>
            </div>
            <!--
            <div class="sender-input-image-wrap">
                <div class="sender-input-image">
                    <p>Signature Upload</p>
                    <button type="button" class="upload">Upload</button>
                    <button type="reset" class="remove">Remove</button>
                </div>
                
                <div class="sender-input-image-preview">
                    <div class="image-container">
                        <img src="/assets/LogoSample.png" alt="logo">
                    </div>
                </div>
                <div class="sender-input-image">
                    <p>Head Shot Picture Upload</p>
                    <button type="button" class="upload">Upload</button>
                    <button type="reset" class="remove">Remove</button>
                </div>
                <div class="sender-input-image-preview">
                    <div class="image-container">
                        <img src="/assets/LogoSample.png" alt="logo">
                    </div>
                </div>
            </div>
            -->
        </div>
        <div class="header-save">
            <button type="submit">Save</button>
        </div>
    </div>
    {/if}
</div>
</form>

<style>
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

    button{
        width: 100px;
        height: 30px;
        cursor: pointer;
    }

    /*.remove{
        font-family: 'SourceSansPro Bold';
        border: 2px solid #023DFE;
        color: #023DFE;
        border-radius: 5px;
        background-color: #EEF2F8;
    }

    .remove:hover {
        color: #1b1b1b;
        border-color:#1B1B1B;
        transition: all 0.5s ease;
    }

    .upload{
        font-family: 'SourceSansPro Bold';
        border: 2px solid #023DFE;
        color: white;
        border-radius: 5px;
        background-color: #023DFE;
    }

    .upload:hover {
        border-color: #1B1B1B;
        background-color:#1B1B1B;
        transition: all 0.5s ease;
    }

    img{
        width: min-content;
        height: 100px;}*/

    input{
        width:100%;
        height:30px;
        border: 2px solid #023DFE;
        font-size: 16px;
        border-radius:10px;
        padding-left: 10px;
    }

    .header-save{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .header-save h1{
        padding: 0px 50px 0px 30px;
    }

    .header-save button{
        width: 100%;
        height: 50px;
        font-family: 'SourceSansPro Bold';
        font-size: 20px;
        border: 0px;
        border-radius: 8px;
        background-color: #A0EA00;
        margin-top: 20px;
        margin-bottom: 20px;
        cursor: pointer;
    }

    .header-save button:hover{
        background-color: #1b1b1b;
        color: #A0EA00;
        transition: all 0.5s ease;
    }
    
    .details-wrapper{
        padding: 0px 50px 0px 30px;
        display: flex;
        flex-direction: row;
    }

    .branding-contact{
        width:50%;
        padding: 0px;
        margin: 0px;
        margin-bottom: 0px;
        padding-right: 70px;
    }
    .headers-h3{
    }

    .branding-input{
        height: 45px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }

    .branding-input p{
        width: 200px;
    }

    .contact-input{
        height: 45px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }

    .contact-input p{
        width: 200px;
    }

    /*.branding-input-image{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-left: 20px;
    }

    .branding-input-image-preview-wrapper{
        width: 100%;
    }

    .branding-input-image-preview{
        height: 110px;
        padding: 16px;
        background-color: #D9D9D9;
        border-radius: 10px;
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
    }*/

    .custom-sender{
        width: 50%;
        padding-left: 70px;
        border-left: 1px solid #1B1B1B;
        margin-top: -30px;
    }

    .input-text-areas{
        margin-top: 0px;
    }

    .custom-input{
        height: 78px;
        display: flex;
        flex-direction: row;
        margin-left: 20px;
    }

    .custom-input p{
        width: 200px;
        margin-top: 0px;
    }

    .custom-input textarea{
        width:100%;
        height: 60px;
        border: 2px solid #023DFE;
        border-radius:10px;
        resize: none;
        padding-left: 10px;
    }

    .sender-wrapper{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .sender-input{
        height: 45px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }

    .sender-input p{
        width: 200px;
    }

    /*.sender-input-image-wrap{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .sender-input-image{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        margin-left: 20px;
        margin-top: 5px;
    }

    .sender-input-image p {
        margin: 0;
    }

    .sender-input-image button{ 
        margin-top: 5px;
    }

    .sender-input-image-preview {
        height: 73px;
        width: 50%;
        padding: 16px;
        background-color: #D9D9D9;
        margin-top: 10px;
        border-radius: 10px;
        margin-left: 20px;
    }

    .sender-input-image-preview  .image-container{
        justify-content: center;
        align-items: center;
    }

    .sender-input-image-preview  img{
        height: 65px;
        width: min-content;

        
        justify-content: center;
        align-items: center;
    }*/

</style>
