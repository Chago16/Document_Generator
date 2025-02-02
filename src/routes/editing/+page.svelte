<script>
  import '/src/app.css';
  import { onMount } from 'svelte';
  import Quill from 'quill';
  
let quil;
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']  
];
  
  onMount(() => {
    quil = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      }
    });
  });

  const container = document.getElementById('editor');
</script>

<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />

<div class="header">
  <div class="header-left">
    <img src="/logo/logoIcon.svg" class="logo" alt="Dikta Logo">
    <div class="save-export">
      <button>Exit and Save</button>
        <div class="export">
          <h3>Export as:  </h3>
          <button>Word Document</button>
          <button>PDF</button>
        </div>
    </div>
  </div>
  

  <div class="title">
    <input type="text" name="" id="" placeholder="Title">
  </div>
    
  

</div>

<div class="editing-page">
    <div id="editor">
        <p>Hello World!</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p><br /></p>
      </div>
</div>

  <style>
    .header {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }

    .header .logo {
      width: 55px;
      margin-top: 25px;
      margin-left: 31px;
      margin-bottom: 10px;
    }

    .header-left{
      display: flex;
    }

    .save-export{
      display: flex;
      margin-top: 30px;
      margin-left: 30px;
      font-family: 'Telegraf Regular';
    }

    .save-export button{
      height: 50px;
    }

    .export{
      display: flex;
    }

    .editing-page {
      width: 94.2%;
      background-color: #d9d9d9;
        height: 550px;
        margin: 15px 30px 30px 20px;
        padding-left: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        overflow-x: scroll;
        border-radius: 20px;
    }

    .editing-page::-webkit-scrollbar {
        width: 8px; /* Width of the scrollbar */
        height: 8px;
    }

    .editing-page::-webkit-scrollbar-thumb {
        background: #555; /* Color of the scroll thumb */
        border-radius: 4px; /* Rounded edges for the thumb */
    }

    .editing-page::-webkit-scrollbar-thumb:hover {
        background: #333; /* Darker color when hovered */
    }

    .editing-page::-webkit-scrollbar-track {
        background: transparent; /* Color of the track */
        border-radius: 4px; /* Rounded edges for the track */
    }

    #editor {
        min-width: 8in;
        min-height: 11in;
        padding: 1in;
        margin: 1rem;
        border: 1px solid #1B1B1B;
        background-color: white;
    }

    :global(.ql-toolbar) {
        position: fixed;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        z-index: 999;
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
    }

    :global(.ql-editor) {
        border: none !important;
        box-shadow: none !important;
        background-color: transparent !important;
    }

    #editor {
        margin-top: 70px;
    }

  </style>