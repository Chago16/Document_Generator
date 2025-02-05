<script>
    import '../../app.css';
    import { goto } from '$app/navigation';

    function navigateToEditing(fromPage) {
    goto(`/editing?from=${fromPage}`);
    }
</script>

<div class="home-contents">
    <div class="overflow-container">

        <div class="image-div-container">
            <h1 class="your-proj">YOUR PROJECTS</h1>
        </div>
    
        <h1 class="rec-works">Recent Works</h1>
    
        <div class="item-div">
            <!-- Item Container -->
            <div class="item-container" on:click={navigateToEditing('main')}>
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
    
            <!-- Item Container -->
            <div class="item-container" on:click={navigateToEditing('main')}>
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
            
            <!-- Item Container -->
            <div class="item-container" on:click={navigateToEditing('main')}>
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
    
            <!-- Item Container -->
            <div class="item-container" on:click={navigateToEditing('main')}>
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
    
            <!-- Item Container -->
            <div class="item-container" on:click={navigateToEditing('main')}>
                <div class="item-frame"></div>
                <div class="item-details">
                    <h2 class="doc-name">Document Name</h2>
                    <h3 class="doc-type">Document Type</h3>
                </div>
            </div>
            <!-- /Item Container -->
    
            <!-- Item Container -->
            <div class="item-container" on:click={navigateToEditing('main')}>
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
    
    padding-right: 53px;
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
    /*width: 97%;*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.image-div-container {
    margin-top: 15px;
    border-radius: 5px;
    background-image: url('assets/wp-banner1.png');
    background-size: cover;
    background-position: center;
    /*width: 97%;*/
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-div-container h1{
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5); /* X, Y, blur, color */
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
    max-width: 230px;
    width: 100%;
}

.item-container:hover {
    color:#023DFE;
    cursor: pointer;
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
