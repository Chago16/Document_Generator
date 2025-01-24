<script>

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
</div>


<style>
    .about-wrapper{
        width: 100%;
        display: flex;
        float: right;
    }
    .pictures {
        margin-top: 35px;
        margin-left: 50px;
        max-width: 525px;
        height: 525px;
    }

    .images {
        width: 230px;
        margin: 5px;
        border: 10px solid blue;
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

    .text h1 {
        font-family: 'Poppins Regular';
        color: #F8422F;
    }

    .text p {
        font-family: 'SourceSansPro Regular';
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
</style>
