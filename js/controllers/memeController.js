'use strict'
var gElCanvas;
var gCtx;
var gAlignXCoord = {};
var gStartPos = {};
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];



function initMemeController() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    renderMeme();
}

function goToEditor() {
    initMemeController();
    hideSection('gallery');
    hideSection('saved-memes');
    showSection('editor-container');
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
        renderEditorControls();
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



function onSaveMeme() {
    saveMeme();
    goToSavedMemes();
}



//listeners

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas();
        renderMeme();
    })

    const txtInput = document.querySelector('input[name=txt]');

    txtInput.addEventListener('input', (event) => {
        onSetMemeContent(txtInput);
    });
};


function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp)
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
    ev.preventDefault();
    setCurrLine(clickedLine.idx);
    setLineDrag(clickedLine.line, true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing'
    renderMeme();
}

function onMove(ev) {
    const line = getCurrLine();
    if (!line.isDrag) return
    ev.preventDefault();
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    onMoveTxtLine(dx, dy);
    gStartPos = pos;
    renderMeme();
}

function onUp() {
    var currLine = getCurrLine();
    setLineDrag(currLine, false);
    document.body.style.cursor = 'grab'
}





//canvas funcitons 

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;

    //set coords for align text line
    gAlignXCoord = {
        xLeft: 0.04 * gElCanvas.width,
        xCenter: gElCanvas.width / 2,
        xRight: gElCanvas.width - 0.04 * gElCanvas.width,
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
    gCtx.textAlign = txtLine.align;
    gCtx.font = `${txtSize}px ${txtFont}`;
    gCtx.strokeStyle = txtLine.stroke;
    gCtx.fillStyle = txtLine.fill;
    gCtx.fillText(txtLine.txt, x, y);
    gCtx.strokeText(txtLine.txt, x, y);
    // const currLine = getCurrLine();
    if (isCurrLine(idx)) {
        var txtWidth = getTextWidth(txtLine);
        x = line.selectionPos.x
        y = line.selectionPos.y
        drawRect(x - 0.02 * txtWidth, y + 0.2 * txtSize, txtWidth + 0.04 * txtWidth, -txtSize - 0.1 * txtSize);
    }

}

function getTextWidth(line) {
    return gCtx.measureText(line.txt).width;
}


function getAlignCoords(line) {
    var { y } = line.position;
    switch (line.align) {
        case 'left':
            return { x: gAlignXCoord.xLeft, y };
        case 'center':
            return { x: gAlignXCoord.xCenter, y };
        case 'right':
            return { x: gAlignXCoord.xRight, y };
    }
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



function onMoveTxtLine(dx, dy) {
    moveTxtLine(dx, dy);
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
    if (elInput.name === 'txt') {
        var line = getCurrLine();
        alignLine(line.align);
    }
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
    // const line = getCurrLine();
    alignLine(alignSide);
    renderMeme();
}



//text line events

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
        // if (getClickedLine(pos) === undefined) ev.preventDefault();
    }
    return pos
}
