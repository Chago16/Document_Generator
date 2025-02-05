<script>
    import '../../../app.css';
    import { goto } from '$app/navigation';

    function navigateToEditing(fromPage) {
    goto(`/editing?from=${fromPage}`);
    }
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
            <div class="within-item" on:click={navigateToEditing('main/mydocs')}>
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
                <div class="delete-item">
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                        </svg>
                    </button>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item" on:click={navigateToEditing('main/mydocs')}>
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
                <div class="delete-item">
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                        </svg>
                    </button>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item" on:click={navigateToEditing('main/mydocs')}>
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
                <div class="delete-item">
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                        </svg>
                    </button>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item" on:click={navigateToEditing('main/mydocs')}>
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
                <div class="delete-item">
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                        </svg>
                    </button>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item" on:click={navigateToEditing('main/mydocs')}>
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
                <div class="delete-item">
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                        </svg>
                    </button>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item" on:click={navigateToEditing('main/mydocs')}>
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
                <div class="delete-item">
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                        </svg>
                    </button>
                </div>
            </div> 
            </a>
        </div>
        <!-- /item container -->

         <!-- item container -->
         <div class="items">
            <hr class="line">
            <a href="#">
            <div class="within-item" on:click={navigateToEditing('main/mydocs')}>
                <div class="item1">
                    <h2 class="docu-title">Document Name</h2>
                    <h2 class="docu-type">Document Type</h2>
                </div>
                <div class="item2">
                    <h2 class="date">01/01/25</h2>
                </div>
                <div class="delete-item">
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                        </svg>
                    </button>
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
    font-size: 30px;
    color: #1B1B1B;
}

.labels {
    display: flex;
    margin: 0 0 -10px 5px;
    padding-right: 50px;
}

.label {
    font-family: 'Poppins Bold';
    font-size: 24px;
    margin: 0 0 8px 10px;
    color: #1B1B1B;
}

.label2 {
    font-family: 'Poppins Bold';
    font-size: 18px;
    margin: 0 290px 8px auto;
    color: #1B1B1B;
}

.item-container {
    margin: 0 0 0 0px;
    max-height: 450px; /* Set a maximum height for the container */
    overflow-y: auto;  /* Enable vertical scrolling */
    overflow-x: hidden; /* Disable horizontal scrolling */
    padding-right: 50px; /* Optional: Add padding for scrollbar spacing */
}

.line {
    width: 100%; 
    margin: 0px 0px 0px 0px;
    border-top: 1px solid #1B1B1B;
}

a {
    text-decoration: none;
    color: #1B1B1B;
}

.items {
    text-align: left;
    box-sizing: border-box;
    align-items: center;
}

.within-item {
    display: flex;
    padding-left: 15px;
    padding-bottom: 13px;
}

.within-item:hover {
    background: linear-gradient(to right, #A0EA00, #a0ea0000);
}

.item2 {
    display: flex;
    align-items: center;
    margin: 10px 215px 0px auto;
}
.delete-item{
    margin-top: 19px;
}

.delete-item button{
    background-color: transparent;
    border: 0px;
    cursor: pointer;
}

.delete-item button:hover path{
    fill:#023DFE;
}


.docu-title {
    font-family: 'Poppins Bold';
    font-size: 18px;
    margin: 10px 0 0 0;
}

.docu-type {
    font-family: 'Telegraf Regular';
    font-size: 16px;
    font-weight: 300;
    margin: 2px 0 0 0;
}

.date {
    font-family: 'Telegraf Regular';
    font-size: 18px;
    font-weight: 300;
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