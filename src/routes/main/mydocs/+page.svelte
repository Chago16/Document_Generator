<script>
    import '../../../app.css';


</script>


<div class="mydoc-contents">
    <h1 class="title-header">My Documents</h1>

    <div class="labels">
        <h2 class="label">Name</h2>
        <h2 class="label2">Date</h2>
    </div>
    <div class="item-container">

        <!-- item container -->
        <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item">
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item">
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item">
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item">
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item">
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item">
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item">
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         
         
    </div>
    


</div>





<style>

.mydoc-contents {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
}

.title-header {
    margin-bottom: 5px;
    font-family: 'Poppins Bold';
    font-size: 24px;
    color: #1B1B1B;
}

.labels {
    display: flex;
    margin: 0 0 -10px 5px;
}

.label {
    font-family: 'Poppins Bold';
    font-size: 18px;
    margin: 0 0 8px 10px;
    color: #1B1B1B;
}

.label2 {
    font-family: 'Poppins Bold';
    font-size: 18px;
    margin: 0 250px 8px auto;
    color: #1B1B1B;
}

.item-container {
    margin: 0 0 0 0px;
    max-height: 450px; /* Set a maximum height for the container */
    overflow-y: auto;  /* Enable vertical scrolling */
    overflow-x: hidden; /* Disable horizontal scrolling */
    padding-right: 10px; /* Optional: Add padding for scrollbar spacing */
}

.line {
    width: 97%; 
    margin: 13px 0px 0px 0px;
    border-top: 1px solid #1B1B1B;
}

a {
    text-decoration: none;
    color: #1B1B1B;
}

.items {
    text-align: left;
    box-sizing: border-box;
}

.within-item {
    display: flex;
    margin-left: 15px;
}


.item2 {
    display: flex;
    align-items: center;
    margin: 10px 215px 0px auto;
}

.docu-title {
    font-family: 'Poppins Bold';
    font-size: 18px;
    margin: 10px 0 0 0;
    color: #1B1B1B;
}

.docu-type {
    font-family: 'Telegraf Regular';
    font-size: 16px;
    font-weight: 300;
    margin: 2px 0 0 0;
    color: #1B1B1B;
}

.date {
    font-family: 'Telegraf Regular';
    font-size: 18px;
    font-weight: 300;
    color: #1B1B1B;
}

.item-container::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
}

.item-container::-webkit-scrollbar-thumb {
    background: #555; /* Color of the scroll thumb */
    border-radius: 4px; /* Rounded edges for the thumb */
}

.item-container::-webkit-scrollbar-thumb:hover {
    background: #333; /* Darker color when hovered */
}

.item-container::-webkit-scrollbar-track {
    background: #f0f0f0; /* Color of the track */
    border-radius: 4px; /* Rounded edges for the track */
}

</style>