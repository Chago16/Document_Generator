<script lang="ts">
  import '/src/app.css';
  import { onMount } from 'svelte';
  import Quill from 'quill';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { saveAs } from 'file-saver';
  import { generateWord } from 'quill-to-word';
  import { userStore, templateDataStore } from '../../lib/store.js';
  import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
  import { jsPDF } from "jspdf";
  import html2canvas from "html2canvas";
  /*import { ImageResize } from 'node_modules/quill-image-resize-module/image-resize.min.js';*/
  let isSaved = false;
  let templateData: {
  documentTitle: string;
  documentType: string;
  documentSize: string;
  tone: string;
  detailsPrompt: string;
  additionalDetails: string;
} = {
  documentTitle: '',
  documentType: '',
  documentSize: '',
  tone: '',
  detailsPrompt: '',
  additionalDetails: ''
};
onMount(() => {
  templateDataStore.subscribe(value => {
    if (value) {
      templateData = value;
    }
  });
});

  // @ts-ignore
  let fromPage;
  let editor;

  $: {
      fromPage = $page.url.searchParams.get('from') || 'main';
      
  }

  function exit() {
    if (!isSaved) {
      const confirmExit = confirm("You have unsaved changes. Are you sure you want to exit?");
      if (!confirmExit) return;
    }
    alert("Exiting...");
    goto(`/${fromPage}`);

  }

  // @ts-ignore
  let quil: Quill;
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    ['image'],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['clean']
  ];


  /*Quill.register('modules/imageResize', ImageResize);*/

  onMount(() => {
    quil = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions /*,
        imageResize: {  // Register the image resize module
          modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],  // You can adjust this as needed
        },*/
      }
    });

    let generatedContent = localStorage.getItem('generatedContent');
    if (generatedContent) {
        generatedContent = generatedContent.replace(/^```html\s*/g, '').replace(/\s*```$/g, '');
        generatedContent = convertInlineStylesToClasses(generatedContent);
        // Insert the HTML into the Quill editor
        quil.clipboard.dangerouslyPasteHTML(generatedContent);
    } else {
        console.warn("No content found in localStorage");
    }
  });

  function convertInlineStylesToClasses(html) {
    return html.replace(/style="text-align:\s*center;"/g, 'class="ql-align-center"')
               .replace(/style="text-align:\s*right;"/g, 'class="ql-align-right"')
               .replace(/style="text-align:\s*left;"/g, 'class="ql-align-left"');
}

  async function convertImagesToBase64() {
    const images = document.querySelectorAll('#editor img');

    const promises = Array.from(images).map(async (img) => {
        return new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // @ts-ignore
            canvas.width = img.naturalWidth;
            // @ts-ignore
            canvas.height = img.naturalHeight;
            // @ts-ignore
            ctx.drawImage(img, 0, 0);

            const dataURL = canvas.toDataURL("image/png");
            // @ts-ignore
            img.src = dataURL;

            resolve(dataURL);
        });
    });

    const base64Images = await Promise.all(promises);

    // Modify the Quill delta to store Base64 images
    // @ts-ignore
    const delta = quil.getContents();
    // @ts-ignore
    delta.ops = delta.ops.map((op) => {
        if (op.insert && op.insert.image) {
            // @ts-ignore
            const imgIndex = Array.from(images).findIndex(img => img.src === op.insert.image);
            if (imgIndex !== -1) {
                op.insert.image = base64Images[imgIndex]; // Replace image URL with Base64
            }
        }
        return op;
    });

    return delta;
}

// Function to get image dimensions from the Quill editor
// @ts-ignore
function getImageDimensions(imageUrl) {
    const image = document.querySelector(`img[src="${imageUrl}"]`);
    if (image) {
        return {
            // @ts-ignore
            width: image.width,
            // @ts-ignore
            height: image.height,
        };
    }
    return { width: 500, height: 500 }; // Default to 500 if the image isn't found
}

async function exportToWord() {
    const delta = await convertImagesToBase64(); // Ensure images are Base64 before exporting

    let paragraphs = [];
    // @ts-ignore
    let currentTextRuns = [];
    let currentAlignment = 'left';  // Default alignment

    // @ts-ignore
    delta.ops.forEach(op => {
        if (typeof op.insert === 'string') {
            let textOptions = {};

            // Apply formatting
            if (op.attributes) {
                // @ts-ignore
                if (op.attributes.bold) textOptions.bold = true;
                // @ts-ignore
                if (op.attributes.italic) textOptions.italic = true;
                // @ts-ignore
                if (op.attributes.underline) textOptions.underline = true;

                // @ts-ignore
                if (op.attributes.strike) textOptions.strike = true;

                if (op.attributes.font) {
                    let fontMap = {
                        'sans serif': "Arial",
                        'serif': "Times New Roman",
                        'monospace': "Courier New"
                    };
                    // @ts-ignore
                    textOptions.font = fontMap[op.attributes.font] || "Calibri"; // Default to Calibri
                }

                if (op.attributes.list) {
                    let listType = op.attributes.list;
                    paragraphs.push(new Paragraph({
                        text: op.insert.trim(),
                        bullet: listType === 'bullet' ? { level: 0 } : undefined,
                        numbering: listType === 'ordered' ? { level: 0, reference: "numbered-list" } : undefined,
                    }));
                    return;
                }


                // @ts-ignore
                if (op.attributes.color) textOptions.color = op.attributes.color;
                if (op.attributes.background) {
                    // @ts-ignore
                    textOptions.shading = { fill: op.attributes.background };
                }

                if (op.attributes.size) {
                    let fontSizeMap = {
                        small: 20,  // 10pt
                        large: 28,  // 14pt
                        huge: 40    // 20pt
                    };
                    // @ts-ignore
                    textOptions.size = fontSizeMap[op.attributes.size] || 24; // Default to normal size (12pt)
                }

                if (op.attributes.script === "super") {
                    // @ts-ignore
                    textOptions.superscript = true;
                }

                if (op.attributes.script === "sub") {
                    // @ts-ignore
                    textOptions.subscript = true;
                }


                // Check for text alignment (center, right, left)
                if (op.attributes.align) {
                    currentAlignment = op.attributes.align;
                }
            }

            // Split text by newline, but keep it in the same paragraph
            const textParts = op.insert.split("\n");
            // @ts-ignore
            textParts.forEach((part, index) => {
                if (part !== "") {
                    currentTextRuns.push(new TextRun({ text: part, ...textOptions }));
                }
                if (index !== textParts.length - 1) {
                    paragraphs.push(new Paragraph({
                        // @ts-ignore
                        children: currentTextRuns,
                        // @ts-ignore
                        alignment: currentAlignment,  
                    }));
                    currentTextRuns = [];
                }
            });
        }

        // Handle images
        if (op.insert && op.insert.image) {
            if (currentTextRuns.length > 0) {
                paragraphs.push(new Paragraph({
                    // @ts-ignore
                    children: currentTextRuns,
                    // @ts-ignore
                    alignment: currentAlignment,  // Apply alignment to the paragraph
                }));
                currentTextRuns = [];
            }

            const imageData = op.insert.image.split(",")[1]; // Extract Base64 data
            const { width, height } = getImageDimensions(op.insert.image); // Get image size from editor

            paragraphs.push(
                new Paragraph({
                    children: [
                        // @ts-ignore
                        new ImageRun({
                            data: imageData,
                            transformation: {
                                width: width, // Use original width from editor
                                height: height, // Use original height from editor
                            },
                        }),
                    ],
                    // @ts-ignore
                    alignment: currentAlignment,  // Apply alignment to the paragraph
                })
            );
        }
    });

    // Add last text paragraph if any
    if (currentTextRuns.length > 0) {
        paragraphs.push(new Paragraph({
            // @ts-ignore
            children: currentTextRuns,
            // @ts-ignore
            alignment: currentAlignment,  // Apply alignment to the paragraph
        }));
    }

    // Convert inches to twips (1 inch = 1440 twips)
    const inchesToTwips = 1440;
    let pageWidthInches = 8.5;  // Default for letter size
    let pageHeightInches = 11;  // Default for letter size

    // Set the page size based on documentSize
    if (templateData.documentSize === 'letter') {
        pageWidthInches = 8.5;
        pageHeightInches = 11;
    } else if (templateData.documentSize === 'legal') {
        pageWidthInches = 8.5;
        pageHeightInches = 14;
    } else if (templateData.documentSize === 'a4') {
        pageWidthInches = 8.27;
        pageHeightInches = 11.69;
    }
    const marginInches = 1; // 1 inch margin for all sides

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            width: pageWidthInches * inchesToTwips,  // Convert width to twips
                            height: pageHeightInches * inchesToTwips, // Convert height to twips
                        },
                        margin: {
                            top: marginInches * inchesToTwips, 
                            right: marginInches * inchesToTwips,
                            bottom: marginInches * inchesToTwips,
                            left: marginInches * inchesToTwips,
                        },
                    },
                },
                children: paragraphs,
            },
        ],
    });

    try {
        const blob = await Packer.toBlob(doc);
        saveAs(blob, 'quill-export.docx');
    } catch (error) {
        console.error('Error generating Word document:', error);
    }
}







async function exportToPDF() {
    const editorContent = document.querySelector('.ql-editor');
    if (!editorContent) {
        console.error("Editor content not found!");
        return;
    }

    html2canvas(editorContent, {
        scale: 3, // High resolution
        useCORS: true
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Get actual canvas dimensions
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Define PDF page size based on document size
        let pageWidthInches, pageHeightInches;
        switch (templateData.documentSize) {
            case 'legal':
                pageWidthInches = 8.5;
                pageHeightInches = 14;
                break;
            case 'a4':
                pageWidthInches = 8.27;
                pageHeightInches = 11.69;
                break;
            case 'letter':
            default:
                pageWidthInches = 8.5;
                pageHeightInches = 11;
                break;
        }

        // Convert inches to points (1 inch = 72 points)
        const pdfWidth = pageWidthInches * 72;
        const pdfHeight = pageHeightInches * 72;

        // Define margins (1 inch)
        const margin = 72;
        const usableWidth = pdfWidth - margin * 2;
        const usableHeight = pdfHeight - margin * 2;

        // Adjust height and width while maintaining aspect ratio
        let scaledWidth = usableWidth;
        let scaledHeight = (scaledWidth / imgWidth) * imgHeight; // Maintain aspect ratio

        // Increase the height if necessary but still maintaining aspect ratio
        if (scaledHeight < usableHeight) {
            // Increase height proportionally if it's too small
            scaledHeight = usableHeight * 1.5;
            scaledWidth = (scaledHeight / imgHeight) * imgWidth;
        }

        // Create a new PDF document
        const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);

        // Centering the image properly with margin
        const x = margin + (usableWidth - scaledWidth) / 2;
        const y = margin; // Ensuring proper top alignment

        // Add the image
        pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);

        // Save the file
        const fileName = templateData.documentTitle ? `${templateData.documentTitle}.pdf` : "document.pdf";
        pdf.save(fileName);

        console.log("Generated PDF Filename:", fileName);
    }).catch(error => {
        console.error("Error generating PDF:", error);
    });
}









let user: { _id: string; username: string; email: string } | null = null;

    userStore.subscribe(value => {
		user = value;
	});

  let userId: any;

  onMount(() => {
		const token = localStorage.getItem('token');

		// Clear token to prevent subsequent reloads
		localStorage.removeItem('token');

		if (token) {
			location.reload();
		}
	});

    onMount(async () => {
		try {
			const response = await fetch('/api/login', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});

			const data = await response.json();
			console.log(data)

			if (response.ok) {
				// Store the user data in the `user` variable
				console.log(data.user);

                userStore.set(data.user);
                userId = data.user?._id || null;
                console.log(userId);

			} else {
				console.error('Failed to fetch user data:', data.message);
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}

	});


  async function saveQuillContent() {
  const content = quil.root.innerHTML; // Get Quill's innerHTML
  const owner = userId
  const documentTitle = templateData.documentTitle;  // Replace with the actual document name
  const documentType = templateData.documentType;  // Replace with the actual document type
   // Replace with the actual user ID

   try {
    const response = await fetch('/api/saved_data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner, content, documentTitle, documentType })
    });


    const result = await response.json();
    console.log(result.message);
    isSaved = true;
    alert("Document saved successfully!");
  } catch (error) {
    console.error('Error saving content:', error);
  }
}




</script>

<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />

<div class="header">
  <div class="header-left">
    <img src="/logo/logoIcon.svg" class="logo" alt="Dikta Logo">
    <div class="save-export">
      <div class="exit-save">
        <button on:click={exit}>Exit</button>
        <button on:click={saveQuillContent}>Save</button>
      </div>
      <div class="export">
        <h3>Export as:</h3>
        <!--
        <button on:click={exportToWord}>Word Document</button>-->
        <button on:click={exportToPDF}>PDF</button>
      </div>
    </div>
  </div>
  <!--
  <div class="title">
    <input type="text" name="" id="title" placeholder="Title" bind:value={templateData.documentTitle} readonly>
    <input type="text" name="" id="type" placeholder="Title" bind:value={templateData.documentType} readonly>
  </div>
  -->
  
</div>

<div class="toolbar">
  <svg width="1533" height="76" viewBox="0 0 1533 76" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M56.6839 57.6598L56.699 57.6883L56.7147 57.7165C61.1958 65.708 67.6791 69.6911 76.3622 71.6268C84.7657 73.5001 95.4512 73.5001 108.573 73.5H108.861H356.946H1173.83H1421.91H1422.2C1435.32 73.5001 1446.01 73.5001 1454.41 71.6268C1463.09 69.6911 1469.58 65.708 1474.06 57.7165L1474.07 57.6883L1474.09 57.6598L1489.16 29.067C1489.17 29.0577 1489.17 29.0484 1489.18 29.039C1489.27 28.867 1489.37 28.6826 1489.48 28.4875C1490.36 26.8717 1491.63 24.5186 1494.44 22.3615C1497.56 19.9573 1502.82 17.651 1511.97 17.651V15.151V12.651L18.8067 12.6511V15.1511V17.6511C27.9495 17.6511 33.212 19.9574 36.3367 22.3616C39.1402 24.5185 40.4156 26.8716 41.2914 28.4874C41.397 28.6821 41.4967 28.8661 41.5926 29.0378L56.6839 57.6598Z" fill="white" stroke="#023DFE" stroke-width="2"/>
    <rect width="1533" height="17" fill="white"/>
  </svg>
</div>

<div class="editing-page">
  <div id="editor">
    
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

    .exit-save{
      display: flex;
      flex-direction: row;
      margin-right: 50px;
    }

    .exit-save button{
      margin-right: 20px;
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
      width: 150px;
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
      width: 260px;
      display: flex;
      align-items: center;
      margin-left: 754px;
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
      height: 20px;
      font-family: 'Telegraf Regular';
      font-size: 20px;
      text-align: right;
      border: 0px;
    }

    .title #type {
      font-size: 18px;
      color: rgb(142, 142, 142)    }

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

    :global(.ql-toolbar button) {
      margin-right: 25px; /* Adds spacing between individual toolbar buttons */
    }

    #editor {
        margin-top: 70px;
    }

  </style>