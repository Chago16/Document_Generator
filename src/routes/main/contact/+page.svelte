<script>
    import '../../../app.css';


</script>

<div class="contact-contents">
    <div class="message-side">
        <h1 class="welcome-text">Got a question?<br>Reach out to us!</h1>

        <p>
            We’re here to help! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
            <br><br>
            Our team is dedicated to providing you with the support and information you need. Fill out the form below, send us an email, or connect with us on social media—whatever works best for you. We look forward to hearing from you!
        </p>

        <span style="display: flex; gap: 8px; margin-left: 30px"><svg width="38" height="65" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.375 13.5L22.7193 23.0805C23.4898 23.6337 24.5102 23.6337 25.2807 23.0805L38.625 13.5M10.5 38H37.5C39.9853 38 42 35.9107 42 33.3333V14.6667C42 12.0893 39.9853 10 37.5 10H10.5C8.01472 10 6 12.0893 6 14.6667V33.3333C6 35.9107 8.01472 38 10.5 38Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg><p>diktadocugenerator@gmail.com</p></span>
        
            
    </div>
    <div class="form-side">
        <form action="/submit" method="POST">
            <div class="full-name">
                <input type="text" placeholder="First Name" id="firstName">
                <input type="text" placeholder="Last Name" id="lastName">
            </div>
            <input type="email" placeholder="Email" id="email">
            <input type="number" placeholder="Phone Number (Optional)" id="phoneNumber">
            <select id="subject" name="subject">
                <option value="question">Question</option>
                <option value="feedback">Feedback</option>
                <option value="support">Support</option>
                <option value="suggestion">Suggestion</option>
              </select>
              <input type="text" placeholder="Subject Title" id="subjectTitle">
              <textarea placeholder="Your Message" name="message" id="message"></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>

    
</div>



<style>

.contact-contents {
    display: flex;
    flex-direction: row;
    margin-left: 30px;
}

.message-side {
    flex: 1;
}

.form-side {
    flex: 1;
    text-align: center;
    margin-top: 30px;
    font-family: 'SourceSansPro Regular';
}

.welcome-text {
    font-family: 'Poppins Bold';
    font-size: 50px;
    line-height: 1.2;
    color: #1B1B1B;
}

p {
    font-family: 'SourceSansPro Regular';
    font-size: 20px;
    color: #1B1B1B;
}

.form-side input {
    font-size: 18px;
    width: 80%;
    margin: 10px;
    height: 30px;
    padding-left: 15px;
    border-radius: 7px;
    border: 3px solid #023DFE;
    font-family: 'SourceSansPro Regular';
}

.form-side select {
    padding-left: 15px;
    font-size: 18px;
    width: 83%;
    margin: 10px;
    height: 38px;
    border-radius: 7px;
    border: 3px solid #023DFE;
    font-family: 'SourceSansPro Regular';
}

.form-side textarea {
    padding-left: 15px;
    font-size: 16px;
    width: 80%;
    margin: 10px;
    height: 120px;
    border-radius: 7px;
    border: 3px solid #023DFE;
    font-family: 'SourceSansPro Regular';
    resize: none;
}

.form-side button {
    width: 83%;
    margin: 10px;
    height: 40px;
    border-radius: 5px;
    border: 0;
    color: #EEF2F8;
    background-color: #023DFE;
    font-family: 'SourceSansPro Bold';
    font-size: 20px;
    z-index: 1;
    cursor: pointer;
    transition: all 0.5s ease;
}

.form-side button:hover {
    color: #EEF2F8;
    background-color:#1B1B1B;
    transition: all 0.5s ease;
}

.full-name input {
    width: 36.75%;
}

</style>