<script>
    import '../../app.css';


</script>


<div class="about-wrapper">
    <div class="pictures">
        <div class="top">
            <img class="images aj" src="/assets/AJPic.png" alt="">
            <img class="images lui" src="/assets/LuiPic.png" alt="">
        </div>
        <div class="bottom">
            <img class="images ches" src="/assets/ChesPic.png" alt="">
            <img class="images gaby" src="/assets/GabyPic.png" alt="">
        </div>
    </div>

    <div class="text">
        <h1>About the Team</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec metus nibh. Vivamus sapien felis, fermentum id leo nec, viverra laoreet ipsum. Donec luctus quis arcu non dignissim. Vivamus posuere arcu id est tempor fringilla. Duis ac magna vel ex molestie finibus ac nec mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dictum purus, nec imperdiet felis. Sed quis ipsum sed est posuere mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            <br><br>
            Aenean in lorem eu dui fringilla tempor. Nulla aliquet libero mauris, sed pellentesque elit bibendum sollicitudin. Maecenas in congue urna. Maecenas commodo felis turpis, a ornare nisl faucibus a. Ut ac lobortis mauris. Donec tristique sit amet orci vel suscipit. Proin risus enim, commodo sed ex ut, pharetra sodales est. Vestibulum gravida lobortis libero, vitae interdum leo fringilla nec.
            <br><br>
            Quisque turpis nisl, iaculis id diam id, facilisis feugiat lorem. Curabitur tempus rhoncus vestibulum. Mauris non consectetur justo. Quisque rutrum posuere massa, nec viverra velit aliquam ut. Fusce placerat at metus sit amet hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque a nulla tortor. Sed tempor rhoncus mollis. Curabitur malesuada sapien a ante tempor elementum sed id nibh. Mauris accumsan, odio sit amet mollis semper, lorem ante consectetur tellus, ultricies eleifend orci sem vel nulla. Nunc fermentum erat a dolor maximus auctor. Cras interdum molestie tellus, in ultrices velit commodo quis. Sed et risus at purus dapibus egestas. Mauris accumsan cursus sem eget semper. Nulla ac lectus ac turpis iaculis tincidunt sed quis erat.</p>
    </div>

    <div class="blur circle-1 "></div>
    <div class="blur circle-2 "></div>
    <div class="blur circle-3 "></div>

    <div class="status-window">
        <h1>Anthony James Esteban</h1>
        <h3>[Role]</h3>

        <div class="skillRate">
            <div class="bar">
                <div class="skill">
                    <p>UI/UX Design</p>
                </div>
                <div class="progressBar">
                    <span class="ui-ux"></span>
                </div>
            </div>
            <div class="bar">
                <div class="skill">
                    <p>Front-end Dev</p>
                </div>
                <div class="progressBar">
                    <span class="frontend"></span>
                </div>
            </div>
            <div class="bar">
                <div class="skill">
                    <p>Back-end Dev</p>
                </div>
                <div class="progressBar">
                    <span class="backend"></span>
                </div>
            </div>
            <div class="bar">
                <div class="skill">
                    <p>Communication</p>
                </div>
                <div class="progressBar">
                    <span class="communication"></span>
                </div>
            </div>
        </div>
    </div>

</div>


<style>
    .about-wrapper{
        width: 100%;
        display: flex;
        float: right;
    }
    .pictures {
        margin-top: 20px;
        margin-left: 50px;
        max-width: 525px;
        height: 525px;
    }

    .images {
        width: 230px;
        margin: 5px;
        border: 10px solid #023DFE;
        border-radius: 150px;
        transition: filter 0.3s ease; /* Smooth transition for hover effect */
    }

    /* Individual corner customizations */
    .images.ches {
        border-top-right-radius: 24px;
    }

    .images.gaby {
        border-top-left-radius: 24px;
    }

    .images.lui {
        border-bottom-left-radius: 24px;
    }

    .images.aj {
        border-bottom-right-radius: 24px;
    }

    /* Default state: all images are in full color and sharp */
    .images {
        filter: blur(0px) opacity(100%); /* Clear by default */
    }

    /* Make all images grayscale, blurry, and lighter except the one being hovered */
    .pictures:hover .images {
        filter: blur(5px) opacity(50%); /* Apply blur, grayscale, and increase brightness */
    }

    .pictures .images:hover {
        filter: blur(0px) opacity(100%); /* Hovered image stays in color and sharp */
    }

    .text {
        width: 650px;
        margin-left: 100px;
        margin-top: 40px;
        z-index: 10; /* Ensure the text is on top */
        position: relative; /* Position relative to its normal flow */
    }

    h1 {
        font-family: 'Poppins Bold';
        font-size: 26px;
        margin-top: 0px;
        margin-bottom: 0px;
    }

    h3 {
        font-family: 'Telegraf Regular';
        font-size: 20px;
        margin-top: 0px;
    }

    p {
        font-family: 'SourceSansPro Regular';
        font-size: 14px;
    }

    .blur {
        position: absolute;
        border-radius: 100%;
        background: #A0EA00;
        filter: blur(30px);
        pointer-events: none; /* Ensures the blur doesn't interfere with other elements */
        z-index: 1; /* Keep blur circles behind the text */
    }

    .circle-1 {
        width: 200px;
        height: 200px;
        top: 0%;
        left: 45%;
    }

    .circle-2 {
        width: 250px;
        height: 100px;
        transform: rotateZ(10deg);
        top: 20%;
        left: 53%;
    }

    .circle-3 {
        width: 350px;
        height: 100px;
        transform: rotateZ(-10deg);
        top: 75%;
        left: 73%;
    }


    .status-window{
        width: 400px;
        position: absolute;
        background: #131313;
        padding: 30px;
        border-radius: 20px;
        top:280px;
        left: 80px;
        color:#D9D9D9;
    }

    .status-window::after {
        content: "";
        position: absolute;
        bottom: 259px; /* Position it below the div */
        left: 80px; /* Position it on the left side of the div */
        border-width: 30px;
        border-style: solid;
        border-color: transparent transparent  #131313  transparent; /* down left up right */
    }

    .skillRate{
        width: 100%;
    }

    .bar{
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
    }

    .skill{
        width: 110px;
    }

    .skill p{
        width: 100px;
        font-weight: 600;
    }

    .progressBar{
        width: 100%;
        height: 20px;
        margin-top: 0px;
        background-color: #ffffff;
        border: 1px solid black;
        border-radius: 15px;
        position: relative;
    }

    .ui-ux{
        position: absolute;
        height: 100%;
        border-radius: 15px;
        width: 50%;
        background-color: #023DFE;
    }

    .frontend{
        position: absolute;
        height: 100%;
        border-radius: 15px;
        width: 50%;
        background-color: #F8422F;
    }

    .backend{
        position: absolute;
        height: 100%;
        border-radius: 15px;
        width: 50%;
        background-color: #707070;
    }

    .communication{
        position: absolute;
        height: 100%;
        border-radius: 15px;
        width: 50%;
        background-color: #A0EA00;
    }
</style>
