<script>
    import '../app.css';


</script>

<div class="home-contents">
    <div class="overflow-container">

        <div class="image-div-container">
            <h1 class="your-proj">YOUR PROJECTS</h1>
        </div>
    
        <h1 class="rec-works">Recent Works</h1>
    
        <div class="item-div">
            <!-- Item Container -->
            <div class="item-container">
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
    
            <!-- Item Container -->
            <div class="item-container">
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
            
            <!-- Item Container -->
            <div class="item-container">
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
    
            <!-- Item Container -->
            <div class="item-container">
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
    
            <!-- Item Container -->
            <div class="item-container">
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
    
            <!-- Item Container -->
            <div class="item-container">
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
            
        </div>


    </div>
</div>




<style>

.home-contents {
    margin-left: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.overflow-container {
    overflow-y: auto;
    max-height: 77vh;
}

.overflow-container::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
}

.overflow-container::-webkit-scrollbar-thumb {
    background: #555; /* Color of the scroll thumb */
    border-radius: 4px; /* Rounded edges for the thumb */
}

.overflow-container::-webkit-scrollbar-thumb:hover {
    background: #333; /* Darker color when hovered */
}

.overflow-container::-webkit-scrollbar-track {
    background: #f0f0f0; /* Color of the track */
    border-radius: 4px; /* Rounded edges for the track */
}

.item-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.image-div-container {
    margin-top: 15px;
    border-radius: 5px;
    background-image: url(assets/wp-banner.png);
    background-size: cover;
    background-position: center;
    width: 95%;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.your-proj {
    font-family: 'Poppins Bold';
    font-size: 40px;
    color: #EEF2F8;
}

.rec-works {
    font-family: 'Poppins Bold';
    font-size: 20px;
    color: #1B1B1B;
    margin: 20px 0 0 0;
}

.item-container {
    margin: 0 20px 0 0;
    max-width: 230px;
    width: 100%;
}

.item-frame {
    background-color: #D9D9D9;
    border-radius: 5px;
    height: 260px;
    width: 230px;
    margin: 20px 0 5px 0;
}

.doc-name {
    font-family: 'Poppins Semibold';
    font-size: 20px;
    margin-bottom: 0px;
    margin-top: 0px;
}

.doc-type {
    font-family: 'Telegraf Regular';
    font-weight: 300;
    font-size: 18px;
    margin-top: 0px;
}

</style>
