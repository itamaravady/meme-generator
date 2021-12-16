'use strict'
var gElCanvas;
var gCtx;
var gAlignCoords = {};

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];



function initMemeController() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    getMemeDefault();
    addListeners();
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
    if (!meme.lines.length) return;
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
}



//listeners

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderMeme();
    })
};


function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    var clickedLine = getClickedLine(pos);
    if (clickedLine === undefined) return;
    console.log(clickedLine);
    setCurrLine(clickedLine.idx);
    renderMeme();

    // setLineDrag(true);
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const circle = getCircle();
    if (!circle.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCircle(dx, dy)
    gStartPos = pos
    renderCanvas()

}

function onUp() {
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
}





//canvas funcitons 

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    //set coords for align line
    gAlignCoords = {
        left: 20,
        center: gElCanvas.width / 2,
        right: gElCanvas.width - 20,
    };
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

function onAddLine() {
    addLine(gElCanvas.width, gElCanvas.height);
    renderMeme();
}


//on change content

function onSetCurrLine() {
    setCurrLine();
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
    const meme = getMeme();
    if (!meme.lines.length) return;
    removeLine();
    onSetCurrLine();
    renderMeme();
}

function onAlignLine(alignSide) {
    alignLine(alignSide, gAlignCoords);
    renderMeme();
}


//text line events

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}
