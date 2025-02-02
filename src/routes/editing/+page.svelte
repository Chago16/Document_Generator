<script>
  import '/src/app.css';
  import { onMount } from 'svelte';
  import Quill from 'quill';
  import { goto } from '$app/navigation';

  function exitAndSave() {
    goto('/main'); // Redirects to the main layout
  }
  
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
      <button on:click={exitAndSave}>Exit and Save</button>
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

<div class="toolbar">
  <svg width="1748" height="54" viewBox="0 0 1748 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.2467 12.3063C27.2904 9.42738 22.4451 0.0433842 0 0.0433842C0 0.0433842 65.7617 -0.0542303 74.1369 0.0433842L1352.15 0.0433812V54H105.424C74.1369 54 56.4529 54 46.9307 39.9853L29.2467 12.3063Z" fill="white"/>
    <path d="M29.2467 12.3063C27.2904 9.42738 22.4451 0.0433842 0 0.0433842C0 0.0433842 65.7617 -0.0542303 74.1369 0.0433842L1352.15 0.0433812V54H105.424C74.1369 54 56.4529 54 46.9307 39.9853L29.2467 12.3063Z" fill="white"/>
    <path d="M1718.75 12.3063C1720.71 9.42738 1725.55 0.0433842 1748 0.0433842C1748 0.0433842 1682.24 -0.0542303 1673.86 0.0433842L395.851 0.0433812V54H1642.58C1673.86 54 1691.55 54 1701.07 39.9853L1718.75 12.3063Z" fill="white"/>
    <path d="M1718.75 12.3063C1720.71 9.42738 1725.55 0.0433842 1748 0.0433842C1748 0.0433842 1682.24 -0.0542303 1673.86 0.0433842L395.851 0.0433812V54H1642.58C1673.86 54 1691.55 54 1701.07 39.9853L1718.75 12.3063Z" fill="white"/>
    </svg>
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
      align-items: center;
      margin-top: 10px;
      margin-left: 30px;
      font-family: 'Telegraf Regular';
      font-size: 16px;
    }

    .save-export button{
      height: 50px;
      font-family: 'Telegraf Regular';
      font-size: 16px;
      background-color: #023DFE;
      color: white;
      border: 0px;
      border-radius: 5px;
      padding: 15px;
      cursor: pointer;
    }

    .export{
      display: flex;
      align-items: center;
      margin-left: 30px;
    }

    .export button{
      background-color: white;
      color: #023DFE;
      border: 2px solid #023DFE;
      width: 160px;
      margin-left: 10px;
      cursor: pointer;
    }

    .title{
      margin-top: 10px;
      margin-right: 30px;
    }

    .title input{
      width: 400px;
      height: 40px;
      font-family: 'Telegraf Regular';
      font-size: 20px;
      text-align: right;
      border: 0px;
    }

    .toolbar{
      width: 100%;
      display: flex;
      position: fixed;
      justify-content: center;
      top:102px;
      z-index: 10;
    }

    .toolbar svg{
      width: 1300px;
    }

    .editing-page {
      width: 97.4%;
      background-color: #d9d9d9;
        height: 600px;
        margin: 15px 30px 00px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        overflow-x: scroll;
        border-radius: 20px;
        z-index: 3;
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