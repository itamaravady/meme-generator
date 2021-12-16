'use strict'
var gElCanvas;
var gCtx;
var gAlignCoords = {};

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];



function initMemeController() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    renderMeme();
}

function getCanvasSize() {
    var canvasSize = { width: gElCanvas.width, height: gElCanvas.height };
    return canvasSize;
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
    lines.forEach((line, idx) => drawTxtLine(line, idx));
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


function drawTxtLine(line, idx) {
    var { x, y } = line.position;
    const meme = getMeme();
    var txtLine = meme.lines[idx];
    const txtFont = txtLine.font;
    const txtSize = txtLine.size;
    gCtx.lineWidth = txtLine.lineWidth;
    // STOPPED HERE
    // gCtx.textAlign = txtLine.align;
    gCtx.font = `${txtSize}px ${txtFont}`;
    gCtx.strokeStyle = txtLine.stroke;
    gCtx.fillStyle = txtLine.fill;
    gCtx.fillText(txtLine.txt, x, y);
    gCtx.strokeText(txtLine.txt, x, y);
    // const currLine = getCurrLine();
    if (isCurrLine(idx)) {
        var txtWidth = getTextWidth(txtLine);
        x = line.RectPosition.x
        y = line.RectPosition.y
        drawRect(x - 0.02 * txtWidth, y + 0.2 * txtSize, txtWidth + 0.04 * txtWidth, -txtSize - 0.1 * txtSize);
    }

}

function getTextWidth(line) {
    return gCtx.measureText(line.txt).width;
}

function drawRect(x, y, sizeX, sizeY) {
    gCtx.beginPath();
    gCtx.rect(x, y, sizeX, sizeY);
    gCtx.setLineDash([8, 8]);
    gCtx.lineWidth = 2.5;
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
    gCtx.closePath();
    gCtx.setLineDash([]);
}



function onAddLine() {
    addLine();
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
    const line = getCurrLine()
    var lineWidth = gCtx.measureText(line.txt).width;
    alignLine(alignSide, lineWidth);
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
