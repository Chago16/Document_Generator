<script>
    import '../../../app.css';

    let showStatus = false;
    let statusData = {
        top: "280px",
        left: "80px",
        arrowLeft: "120px",
        bottom: "259px",
        arrowBorder: "transparent transparent #131313 transparent", // Default shape
        name: "",
        role: "",
        skills: {
            "UI/UX Design": { width: "50%", className: "ui-ux" },
            "Front-end Dev": { width: "50%", className: "frontend" },
            "Back-end Dev": { width: "50%", className: "backend" },
            "Communication": { width: "50%", className: "communication" }
        }
    };

    /**
	 * @param {string} name
	 * @param {string} role
	 * @param {{ "UI/UX Design": { width: string; className: string; } | { width: string; className: string; } | { width: string; className: string; } | { width: string; className: string; }; "Front-end Dev": { width: string; className: string; } | { width: string; className: string; } | { width: string; className: string; } | { width: string; className: string; }; "Back-end Dev": { width: string; className: string; } | { width: string; className: string; } | { width: string; className: string; } | { width: string; className: string; }; Communication: { width: string; className: string; } | { width: string; className: string; } | { width: string; className: string; } | { width: string; className: string; }; }} skills
	 */
    function displayStatus(
        name,
        role,
        skills,
        top = "280px",
        left = "80px",
        arrowLeft = "120px",
        bottom = "259px",
        arrowBorder = "transparent transparent #131313 transparent" // Default arrow shape
    ) {
        statusData = { name, role, skills, top, left, arrowLeft, bottom, arrowBorder };
        showStatus = true;
    }

    function hideStatus() {
        showStatus = false;
    }
</script>


<div class="about-wrapper">
    <div class="pictures">
        <div class="top">
            <img class="images aj" src="/assets/AJPic.png" alt=""
                onmouseover={() => displayStatus("Anthony James Esteban", "[Role]", {
                    "UI/UX Design": { width: "50%", className: "ui-ux" },
                    "Front-end Dev": { width: "50%", className: "frontend" },
                    "Back-end Dev": { width: "50%", className: "backend" },
                    "Communication": { width: "50%", className: "communication" }
                })}
                onmouseleave={hideStatus}>

            <img class="images lui" src="/assets/LuiPic.png" alt=""
                onmouseover={() => displayStatus("Luigi Lagman", "[Role]", {
                    "UI/UX Design": { width: "85%", className: "ui-ux" },
                    "Front-end Dev": { width: "70%", className: "frontend" },
                    "Back-end Dev": { width: "30%", className: "backend" },
                    "Communication": { width: "40%", className: "communication" }
                }, "280px", "80px", "320px")}
                onmouseleave={hideStatus}>
        </div>
        <div class="bottom">
            <img class="images ches" src="/assets/ChesPic.png" alt=""
                onmouseover={() => displayStatus("Marc Chester Perez", "[Role]", {
                    "UI/UX Design": { width: "50%", className: "ui-ux" },
                    "Front-end Dev": { width: "50%", className: "frontend" },
                    "Back-end Dev": { width: "50%", className: "backend" },
                    "Communication": { width: "50%", className: "communication" }
                }, "20px", "80px", "80px", "-59px", "#131313 transparent transparent  transparent")}
                onmouseleave={hideStatus}>
            <img class="images gaby" src="/assets/GabyPic.png" alt=""
                onmouseover={() => displayStatus("Gabriel Ian Santos", "[Role]", {
                    "UI/UX Design": { width: "50%", className: "ui-ux" },
                    "Front-end Dev": { width: "50%", className: "frontend" },
                    "Back-end Dev": { width: "50%", className: "backend" },
                    "Communication": { width: "50%", className: "communication" }
                }, "20px", "80px", "320px", "-59px", "#131313 transparent transparent  transparent")}
                onmouseleave={hideStatus}>
        </div>
    </div>

    <div class="text">
        <h1>About the Team</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec metus nibh. Vivamus sapien felis, fermentum id leo nec, viverra laoreet ipsum. Donec luctus quis arcu non dignissim. Vivamus posuere arcu id est tempor fringilla. Duis ac magna vel ex molestie finibus ac nec mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dictum purus, nec imperdiet felis. Sed quis ipsum sed est posuere mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
            <br><br>
            Aenean in lorem eu dui fringilla tempor. Nulla aliquet libero mauris, sed pellentesque elit bibendum sollicitudin. Maecenas in congue urna. Maecenas commodo felis turpis, a ornare nisl faucibus a. Ut ac lobortis mauris. Donec tristique sit amet orci vel suscipit. Proin risus enim, commodo sed ex ut, pharetra sodales est. Vestibulum gravida lobortis libero, vitae interdum leo fringilla nec.
    </div>

    <div class="blur circle-1 "></div>
    <div class="blur circle-2 "></div>
    <div class="blur circle-3 "></div>

    {#if showStatus}
        <div class="status-window" style="top: {statusData.top}; left: {statusData.left};">
            <h1>{statusData.name}</h1>
            <h3>{statusData.role}</h3>

            <div class="skillRate">
                {#each Object.entries(statusData.skills) as [skill, { width, className }]}
                    <div class="bar">
                        <div class="skill">
                            <p>{skill}</p>
                        </div>
                        <div class="progressBar">
                            <span class={className} style="width: {width};"></span>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="status-window-arrow" style="bottom: {statusData.bottom}; left: {statusData.arrowLeft}; border-color: {statusData.arrowBorder};"></div>
        </div>
    {/if}

</div>


<style>
    .about-wrapper{
        width: 100%;
        display: flex;
        float: right;
        color: #1b1b1b;
    }
    .pictures {
        margin-top: 20px;
        margin-left: 50px;
        min-width: 525px;
        height: 525px;
        z-index: 3;
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
        width: 100%;
        margin-left: 100px;
        margin-top: 40px;
        z-index: 10; /* Ensure the text is on top */
        position: relative; /* Position relative to its normal flow */
        margin-right: 50px;
    }

    h1 {
        font-family: 'Poppins Bold';
        font-size: 50px;
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
        font-size: 18px;
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


    .status-window {
        display: block;
        width: 400px;
        position: absolute;
        background: #131313;
        padding: 30px;
        border-radius: 20px;
        color: #D9D9D9;
        z-index: 5;
    }

    .status-window h1{
        font-size: 26px;
    }

    .status-window p{
        font-size: 14px;
    }

    .status-window-arrow {
        content: "";
        position: absolute;
        border-width: 30px;
        border-style: solid;
        border-color: transparent transparent #131313 transparent;
    }

    .skillRate {
        width: 100%;
    }

    .skillRate p{
        width: 150px;
    }

    .bar {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
    }

    .skill {
        width: 110px;
    }

    .progressBar {
        width: 100%;
        height: 20px;
        background-color: #ffffff;
        border: 1px solid black;
        border-radius: 15px;
        position: relative;
    }

    /* Skill Bar Colors */
    .ui-ux {
        position: absolute;
        height: 100%;
        border-radius: 15px;
        background-color: #023DFE;
    }

    .frontend {
        position: absolute;
        height: 100%;
        border-radius: 15px;
        background-color: #F8422F;
    }

    .backend {
        position: absolute;
        height: 100%;
        border-radius: 15px;
        background-color: #707070;
    }

    .communication {
        position: absolute;
        height: 100%;
        border-radius: 15px;
        background-color: #A0EA00;
    }
</style>
