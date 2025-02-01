<script>
  import '../../../../app.css';
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

<div class="editing-page">
    <div id="editor">
        <p>Hello World!</p>
        <p>Some initial <strong>bold</strong> text</p>
        <p><br /></p>
      </div>
</div>




  <style>

    .editing-page {
        margin: 15px 30px 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #editor {
        width: 8.5in;
        height: 11in;
        padding: 1in;
        margin: 1rem;
        border: 1px solid #1B1B1B;
    }

    :global(.ql-toolbar) {
        color: red;
        border-radius: 50px;
    }

  </style>