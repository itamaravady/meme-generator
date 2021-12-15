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
    const canvas = getCanvas()
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, canvas.width, canvas.height);

        //when image loads continure rendering meme content on canvas
        renderMemeContent();
    };
}


function renderMemeContent() {
    drawTxtLine();
}






//draw funcitons 

function drawTxtLine() {
    const meme = getMeme();
    var txtLine = meme.lines[meme.selectedLineIdx];
    const txtSize = txtLine.size;
    const txtFont = txtLine.font;
    gCtx.lineWidth = txtLine.lineWidth;
    gCtx.textAlign = txtLine.align;
    gCtx.font = `${txtSize}px ${txtFont}`;
    gCtx.strokeStyle = txtLine.stroke;
    gCtx.fillStyle = txtLine.fill;
    gCtx.fillText(txtLine.txt, 50, 50);
    gCtx.strokeText(txtLine.txt, 50, 50);
}


//on change content

function onSetMemeContent(elInput) {
    setMemeContent(elInput.name, elInput.value);
    renderMeme();
}