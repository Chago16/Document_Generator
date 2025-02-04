<script>
  import '/src/app.css';
  import { onMount } from 'svelte';
  import Quill from 'quill';
  import { goto } from '$app/navigation';
  import { saveAs } from 'file-saver';
  import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
  import { jsPDF } from "jspdf";
  import html2canvas from "html2canvas";

  let quil;
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['image'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ];

  function exitAndSave() {
    goto('/main/templates');
  }

  onMount(() => {
    quil = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      }
    });
  });

  async function convertImagesToBase64() {
    const images = document.querySelectorAll('#editor img');

    const promises = Array.from(images).map(img => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        img.src = canvas.toDataURL("image/png");
        resolve();
      });
    });

    await Promise.all(promises);
  }

  async function exportToWord() {
    await convertImagesToBase64(); // Ensure images are properly encoded before exporting

    const delta = quil.getContents(); // Get Quill content
    const paragraphs = delta.ops.map(op => {
        let paragraphContent = [];
        
        // Check for different formats in the Delta operations
        if (typeof op.insert === 'string') {
            let textOptions = {};
            
            // Check for formatting in the current operation
            if (op.attributes) {
                if (op.attributes.bold) {
                    textOptions.bold = true; // Set bold as true
                }
                if (op.attributes.italic) {
                    textOptions.italic = true; // Set italic as true
                }
                if (op.attributes.underline) {
                    textOptions.underline = true; // Set underline as true
                }
                if (op.attributes.strike) {
                    textOptions.strike = true; // Set strike as true
                }
                if (op.attributes.font) {
                    textOptions.font = op.attributes.font; // Set font
                }
                if (op.attributes.color) {
                    textOptions.color = op.attributes.color; // Set color
                }
                if (op.attributes.size) {
                    textOptions.size = op.attributes.size; // Set size
                }
                if (op.attributes.align) {
                    textOptions.alignment = op.attributes.align; // Set alignment
                }
            }
            
            // Create a TextRun with the text and formatting options
            const text = new TextRun(op.insert, textOptions);
            paragraphContent.push(text);
        } else if (op.insert && op.insert.image) {
            // Handle images in the Quill content
            paragraphContent.push(new ImageRun({
                data: op.insert.image, 
                transformation: { width: 300, height: 300 } // Set the image size if needed
            }));
        }

        // Return a new Word paragraph with the rich text
        return new Paragraph({
            children: paragraphContent
        });
    });

    // Create a document with custom page size and styling
    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            width: 12240,  // 8.5 inches in twips (legal size width)
                            height: 20160, // 14 inches in twips (legal size height)
                        },
                        margin: {
                            top: 1440, // 1 inch
                            right: 1440,
                            bottom: 1440,
                            left: 1440,
                        },
                    },
                },
                children: paragraphs,
            },
        ],
        styles: {
            '@page WordSection1': {
                'size': '8.5in 14in', // Set Legal size (8.5in × 14in)
                'margin': '1in 1in 1in 1in' // 1-inch margin on all sides
            },
            'p': {
                'font-size': '12pt',
                'line-height': '1.5'
            }
        }
    });

    // Generate the Word document as a Blob and save it
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'legal-size-document.docx');
    }).catch(error => {
        console.error('Error generating Word document:', error);
    });
}

  function exportToPDF() {
    const editorContent = document.querySelector('.ql-editor');

    if (!editorContent) {
      console.error("Editor content not found!");
      return;
    }

    const doc = new jsPDF();

    html2canvas(editorContent, {
      scale: 2,
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      doc.save("document.pdf");
    }).catch(error => console.error("Error generating PDF:", error));
  }
</script>

<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />

<div class="header">
  <div class="header-left">
    <img src="/logo/logoIcon.svg" class="logo" alt="Dikta Logo">
    <div class="save-export">
      <button on:click={exitAndSave}>Exit and Save</button>
      <div class="export">
        <h3>Export as:</h3>
        <button on:click={exportToWord}>Word Document</button>
        <button on:click={exportToPDF}>PDF</button>
      </div>
    </div>
  </div>

  <div class="title">
    <input type="text" name="" id="" placeholder="Title">
  </div>
</div>

<div class="toolbar">
  <svg width="1533" height="76" viewBox="0 0 1533 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M56.6839 57.6598L56.699 57.6883L56.7147 57.7165C61.1958 65.708 67.6791 69.6911 76.3622 71.6268C84.7657 73.5001 95.4512 73.5001 108.573 73.5H108.861H356.946H1173.83H1421.91H1422.2C1435.32 73.5001 1446.01 73.5001 1454.41 71.6268C1463.09 69.6911 1469.58 65.708 1474.06 57.7165L1474.07 57.6883L1474.09 57.6598L1489.16 29.067C1489.17 29.0577 1489.17 29.0484 1489.18 29.039C1489.27 28.867 1489.37 28.6826 1489.48 28.4875C1490.36 26.8717 1491.63 24.5186 1494.44 22.3615C1497.56 19.9573 1502.82 17.651 1511.97 17.651V15.151V12.651L18.8067 12.6511V15.1511V17.6511C27.9495 17.6511 33.212 19.9574 36.3367 22.3616C39.1402 24.5185 40.4156 26.8716 41.2914 28.4874C41.397 28.6821 41.4967 28.8661 41.5926 29.0378L56.6839 57.6598Z" fill="white" stroke="#023DFE" stroke-width="2"/>
    <rect width="1533" height="17" fill="white"/>
  </svg>
</div>

<div class="editing-page">
  <div id="editor">
    <img src="/assets/LuiPic.png" alt="Image here">
    <p></p>
  </div>
</div>

  <style>
    .header {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      z-index: 99;
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
      top:89.5px;
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
        border: 2px solid #023DFE;
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
      min-width: 8.5in;
      max-width: 8.5in;
      min-height: 14in;
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