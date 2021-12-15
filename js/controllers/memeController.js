'use strict'
var gElCanvas;
var gCtx;

function initMemeController() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    renderMeme();

}

//renders
function renderMeme() {
    //create and load new image
    var img = new Image();
    const imgUrl = getImgUrl();
    img.src = imgUrl;

    img.onload = () => {
        resizeCanvas();
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

        //when image loads continure rendering meme content on canvas
        renderMemeContent();
        renderEditorControls()
    };
}


function renderMemeContent() {
    const meme = getMeme();
    const lines = meme.lines;
    lines.forEach((line, idx) => drawTxtLine(line.position, idx));
}


function renderEditorControls() {
    const meme = getMeme();
    const lineIdx = meme.selectedLineIdx;
    const line = meme.lines[lineIdx];
    document.querySelector('input[name=txt]').value = line.txt;
    document.querySelector('select[name=font]').value = line.font;
    document.querySelector('input[name=fill]').value = line.fill;
    document.querySelector('input[name=stroke]').value = line.stroke;
}

function goToGallery() {
    initGalleryController();
    hideSection('editor-container');
    showSection('gallery');
    // document.querySelector('.editor').classList.remove('flex');
}







//canvas funcitons 

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    console.log(elContainer.offsetWidth);
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;

}


function drawTxtLine({ x, y }, idx) {
    const meme = getMeme();
    var txtLine = meme.lines[idx];
    const txtSize = txtLine.size;
    const txtFont = txtLine.font;
    gCtx.lineWidth = txtLine.lineWidth;
    gCtx.textAlign = txtLine.align;
    gCtx.font = `${txtSize}px ${txtFont}`;
    gCtx.strokeStyle = txtLine.stroke;
    gCtx.fillStyle = txtLine.fill;
    gCtx.fillText(txtLine.txt, x, y);
    gCtx.strokeText(txtLine.txt, x, y);
}


//on change content

function onChangeLine() {
    const meme = getMeme();
    var lineIdx = ++meme.selectedLineIdx;
    meme.selectedLineIdx = (lineIdx === meme.lines.length) ? 0 : lineIdx;
    renderMeme();
}

function onSetMemeContent(elInput) {
    const meme = getMeme();
    if (!meme.lines.length) return;
    setMemeContent(elInput.name, elInput.value);
    renderMeme();
}
function onSetLineFontSize(elInput) {
    const meme = getMeme();
    if (!meme.lines.length) return;
    setLineFontSize(elInput.value);
    renderMeme();
}

function onRemoveLine() {
    removeLine();
    onChangeLine();
    renderMeme();
}