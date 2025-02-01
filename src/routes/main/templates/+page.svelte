<script>
    import '../../../app.css';


</script>

<div class="templates-contents">
    <div class="past-docus">
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
    </div>


    <div class="template-options">
        <h1>Custom Document Template</h1>

        <div class="details-logo-document-content">
            <div class="details-logo">
                <h3>Details Included</h3>
                <div class="details-input-checkbox">
                    <input type="checkbox" name="chckWithWatermark">
                    <p>With Watermark</p>
                </div>
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
                
                <br>
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
    
            <div class="document-content">
                <h3>Document</h3>
                <div class="document-input">
                    <p>Document Title:</p>
                    <input type="text" name="documentTitle" id="" required>
                </div>
                <div class="document-input">
                    <p>Document Type:</p>
                    <input type="text" name="documentType" id="" required>
                </div>
                <div class="document-input">
                    <p>Document Size:</p>
                    <select id="tone" name="tone">
                        <option value="letter">Letter</option>
                        <option value="legal">Legal</option>
                        <option value="a4">A4</option>
                    </select>
                </div>

                <br><br>
                <h3>Content</h3>
                <div class="content-input-select">
                    <p>Tone:</p>
                    <select id="tone" name="tone">
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
                    <textarea name="detailsPrompt" id="detailsPrompt"></textarea>
                </div>
                <div class="content-input-textarea">
                    <p>Additional Details:</p>
                    <textarea name="additionalDetails" id="additionalDetails"></textarea>
                </div>
            </div>
        </div>
        
        <br>
        <button><a href="/templates/editing">Generate Document</a></button>
    </div>
</div>




<style>
    *{
        color: #1b1b1b;
    }
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

    a{
        text-decoration: none;
    }

    img{
        height: 95px;
        width: min-content;
    }

    input[type="text"]{
        width:100%;
        height:20px;
        border: 1px solid #023DFE;
        border-radius:10px;
        padding-left: 10px;
    }

    input[type="checkbox"]{
        width: 20px; 
        height: 20px;
        border-color: #023DFE;
        accent-color: #023DFE;
        border-radius:10px;
        margin-right: 15px;
    }

    select{
        width:100%;
        height:22px;
        border: 1px solid #023DFE;
        border-radius:10px;
        padding-left: 10px;
    }

    textarea{
        width:100%;
        height:50px;
        border: 1px solid #023DFE;
        border-radius:10px;
        padding-left: 10px;
        resize: none;
    }

    button{
        width: 630px;
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

    .templates-contents{
        display: flex;
        flex-direction: row;
        margin-left: 30px;
    }

    .past-docus{
        width: 220px;
        height: 503px;
        background: #D9D9D9;
        padding: 20px;
        border-radius: 20px;
        margin-right: 30px;
    }

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
    }

    .template-options{
        width: 1015px;
        display: flex;
        flex-direction: column;
    }

    .details-logo-document-content{
        display: flex;
        flex-direction: row;
    }

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
        position: relative; /* Needed for absolute positioning inside */
        display: inline-block; /* Keeps image and checkbox grouped */
    }

    .logo-checkbox-over {
        position: absolute;
        top: 5px; /* Adjust as needed */
        left: 5px;
        width: 20px; /* Adjust checkbox size */
        height: 20px;
        accent-color: #023DFE; /* Change checkbox color */
        cursor: pointer;
    }

    .document-content{
        width: 100%;
        margin-left: 50px;
    }

    .document-content h3{
        margin-bottom: 0px;
    }

    .document-input {
        width: 97%;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }

    .document-input p{
        width: 140px;
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
        width: 140px;
    }

    .content-input-textarea {
        margin-left: 20px;
        width: 97%;
        height: 62px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .content-input-textarea p{
        width: 140px;
    }
</style>