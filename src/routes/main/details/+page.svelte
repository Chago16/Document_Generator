<script>
    import '../../../app.css';


</script>

<div class="header-save">
    <h1>Common Details Setup</h1>
    <button type="submit">Save</button>
</div>

<div class="details-wrapper">

    <div class="branding">
        <h3 class="headers-h3">Branding Details:</h3>
        <div class="branding-input">
            <p>Business Name:</p>
            <input type="text" name="businessName" id="" required>
        </div>
        <div class="branding-input">
            <p>Tagline/Slogan:</p>
            <input type="text" name="taglineSlogan" id="" required>
        </div>
        <div class="branding-input-image">
            <p>Upload Logos</p>
            <div class="buttons-remove-upload">
                <button type="reset" class="remove">Remove</button>
                <button type="button" class="upload">Upload</button>
            </div>
        </div>
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
        <div class="branding-input-image">
            <p>Upload Watermark</p>
            <div class="buttons-remove-upload">
                <button type="reset" class="remove">Remove</button>
                <button type="button" class="upload">Upload</button>
            </div>
        </div>
        <div class="branding-input-image-preview">
            <div class="image-container">
                <img src="/assets/LogoSample.png" alt="logo">
                <img src="/assets/LogoSample.png" alt="logo">
                <img src="/assets/LogoSample.png" alt="logo">
            </div>
        </div>
    </div>

    <div class="contact-custom-sender">
        <h3 class="headers-h3">Contact Details:</h3>
        <div class="contact-input">
            <p>Business Address:</p>
            <input type="text" name="businessAddress" id="" required>
        </div>
        <div class="contact-input">
            <p>Phone Number:</p>
            <input type="number" name="phoneNumber" id="" required>
        </div>
        <div class="contact-input">
            <p>Email Address:</p>
            <input type="email" name="emailAddress" id="" required>
        </div>

        <br>
        <h3 class="headers-h3">Custom Branding Details:</h3>
        <div class="custom-input">
            <p>Default Header Text:</p>
            <textarea name="defaultHeaderText" id=""></textarea>
        </div>
        <div class="custom-input">
            <p>Default Footer Text:</p>
            <textarea name="defaultFooterText" id=""></textarea>
        </div>

        <br>
        <h3 class="headers-h3">Sender Details:</h3>
        <div class="sender-wrapper">
            <div class="sender-input">
                <p>Sender Name:</p>
                <input type="text" name="senderName" id="" required>
            </div>
            <div class="sender-input">
                <p>Position:</p>
                <input type="text" name="senderPosition" id="" required>
            </div>
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
        </div>
    </div>
</div>


<style>
    h1 {
        font-family: 'Poppins Bold';
        font-size: 26px;
    }

    h3{
        font-family: 'Telegraf';
        font-size: 18px;
    }

    p {
        font-family: 'SourceSansPro Regular';
        font-size: 14px;
    }

    button{
        width: 100px;
        height: 30px;
        cursor: pointer;
    }

    .remove{
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

    input{
        width:100%;
        height:20px;
        border: 1px solid #023DFE;
        border-radius:10px;
        padding-left: 10px;
    }

    img{
        width: min-content;
        height: 100px;
    }

    .header-save{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0px 50px 0px 30px;
    }

    .header-save button{
        width: 120px;
        height: 50px;
        font-family: 'SourceSansPro Bold';
        font-size: 20px;
        border: 0px;
        border-radius: 8px;
        background-color: #A0EA00;
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

    .branding{
        width:700px;
        padding: 0px;
        margin: 0px;
        margin-bottom: 0px;
        padding-right: 70px;
        border-right: 1px solid #1B1B1B;
    }
    .headers-h3{
        margin: 0px;
    }

    .branding-input{
        height: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }

    .branding-input p{
        width: 140px;
    }

    .branding-input-image{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-left: 20px;
    }

    .branding-input-image-preview{
        height: 110px;
        width: 400px;
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
    }

    .contact-custom-sender{
        width: 100%;
        padding-left: 70px;
    }

    .contact-input{
        height: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }

    .contact-input p{
        width: 135px;
    }

    .custom-input{
        height: 30px;
        display: flex;
        flex-direction: row;
        margin-left: 20px;
        margin-top: 10px;
    }

    .custom-input p{
        width: 165px;
        margin-top: 0px;
    }

    .custom-input textarea{
        width:100%;
        height: 20px;
        border: 1px solid #023DFE;
        border-radius:10px;
        resize: none;
        padding-left: 10px;
    }

    .sender-wrapper{
        display: flex;
        flex-direction: column;
    }

    .sender-input{
        height: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }

    .sender-input p{
        width: 135px;
    }

    .sender-input-image-wrap{
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
    }

</style>
