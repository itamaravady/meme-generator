'use strict'
var gElCanvas;
var gCtx;

var gAlignXCoord = {};
var gStartPos = {};
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStickersNavIdx = 0;


function initEditor() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    addListeners();
    document.querySelector('.share-container').innerText = ' ';
    renderMeme();
    renderEditorStickers();
}


function getCanvasSize() {
    var canvasSize = { width: gElCanvas.width, height: gElCanvas.height };
    return canvasSize;
}

//renders
function renderMeme(isShareSave = false) {
    var img = new Image();
    const imgUrl = getImgUrl();
    img.src = imgUrl;

    img.onload = () => {
        resizeCanvas();
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

        //when image loads continure rendering meme content on canvas
        renderMemeContent(isShareSave);
        renderEditorControls();
    };
}

function renderEditorStickers() {
    const elStickersContainer = document.querySelector('.stickers-container');
    //get 5 stickers  array
    var emojis = getStickersBatch(gStickersNavIdx);

    const elLists = elStickersContainer.querySelectorAll('li:not(.btn-stickers)');

    elLists.forEach((li, idx) => {
        li.innerText = emojis[idx];
    })
}

function navStickers(navDelta) {
    gStickersNavIdx += navDelta;
    // var stickersBatch = getStickersBatch(gStickersNavIdx);
    if (getStickers().length - 4 <= gStickersNavIdx) gStickersNavIdx = 0;
    else if (gStickersNavIdx < 0) gStickersNavIdx = getStickers().length - 5;
    renderEditorStickers();
}


function onAddSticker(elSticker) {
    addSticker(elSticker.innerText);
    renderMeme();
}


function renderMemeContent(isShareSave) {
    const meme = getMeme()
    //render meme lines
    const lines = meme.lines;
    lines.forEach((line, idx, arr) => drawTxtLine(line, idx, isShareSave, arr, meme));

    //render meme stickers
    const stickers = meme.stickers;
    stickers.forEach((sticker, idx, arr) => {
        drawSticker(sticker, idx, isShareSave, arr)
    });
}


function renderEditorControls() {
    const meme = getMeme();
    if (!meme.lines.length) return;
    const lineIdx = meme.selectionIdx;
    const line = meme.lines[lineIdx];
    if (getSelectedElementType() === 'lines') {
        document.querySelector('input[name=txt]').value = line.txt;
        document.querySelector('select[name=font]').value = line.font;
        document.querySelector('input[name=fill]').value = line.fill;
        document.querySelector('input[name=stroke]').value = line.stroke;
    }
}

function onSaveMeme() {
    renderMeme(true);
    // saveMeme(gElCanvas);
}

function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    uploadImg(imgDataUrl, 'share-container');
}

function generateShareBtn(savedMeme) {
    var elFacebookBtn = savedMeme.facebookBtn;
    const elShareContainer = document.querySelector('.share-container');
    elShareContainer.innerHTML = elFacebookBtn;
}

function onDownloadMeme(elLink) {
    elLink.href = gElCanvas.toDataURL('image/jpeg');
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
    var clickedElement = getClickedCanvasElement(pos);
    if (!clickedElement) return;
    ev.preventDefault();
    setSelectedElement(clickedElement.idx, clickedElement.type);
    setElementDrag(clickedElement.element, true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing'
    renderMeme();
}

function onMove(ev) {
    const element = getCurrElement();
    if (!element || !element.isDrag) return
    // ev.preventDefault();
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveElement(dx, dy);
    gStartPos = pos;
    renderMeme();
}

function onUp() {
    var currElement = getCurrElement();
    document.body.style.cursor = 'grab'
    if (!currElement) return;
    setElementDrag(currElement, false);
}





//canvas funcitons 

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;

    gAlignXCoord = {
        xLeft: 0.04 * gElCanvas.width,
        xCenter: gElCanvas.width / 2,
        xRight: gElCanvas.width - 0.1 * gElCanvas.width,
    };
}


function drawTxtLine(line, idx, isShareSave, arr, meme) {
    var { x, y } = line.position;
    const txtFont = line.font;
    const txtSize = line.size;
    gCtx.beginPath();
    gCtx.lineWidth = line.lineWidth;
    gCtx.font = `${txtSize}px ${txtFont}`;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.fill;
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeText(line.txt, x, y);
    gCtx.closePath();
    if (isShareSave && arr.length - 1 === idx && !meme.stickers.length) saveMeme(gElCanvas);
    if (isCurrElement(idx, 'lines') && !isShareSave) {
        var txtWidth = getTextWidth(line.txt);
        x = line.position.x
        y = line.position.y
        gCtx.beginPath();

        drawRect(x - 0.02 * txtWidth, y + 0.2 * txtSize, txtWidth + 0.04 * txtWidth, -txtSize - 0.1 * txtSize);
        gCtx.closePath();
    }

}

function getTextWidth(lineTxt) {
    return gCtx.measureText(lineTxt).width;
}


function getAlignCoords(line) {
    var { y } = line.position;
    console.log(y);
    switch (line.align) {
        case 'left':
            return { x: gAlignXCoord.xLeft, y };
        case 'center':
            return { x: (gAlignXCoord.xCenter - line.width / 2), y };
        case 'right':
            return { x: (gAlignXCoord.xRight - line.width), y };
    }
}


function drawSticker(sticker, idx, isShareSave, arr) {
    var { x, y } = sticker.position;
    var txtSticker = sticker.sticker;
    const txtSize = sticker.size;
    gCtx.beginPath();
    gCtx.font = `${txtSize}px impact`;
    gCtx.fillText(txtSticker, x, y);
    gCtx.closePath();
    console.log('arr length', arr.length)
    if (isShareSave && arr.length - 1 === idx) saveMeme(gElCanvas);
    if (isCurrElement(idx, 'stickers') && !isShareSave) {
        var stickerWidth = sticker.width;
        x = sticker.position.x + sticker.position.x * 0.04
        y = sticker.position.y + sticker.position.y * 0.05
        gCtx.beginPath();
        drawRect(x, y, stickerWidth + 0.1 * stickerWidth, -txtSize - 0.1 * txtSize);
        gCtx.closePath();
    }

}



function drawRect(x, y, sizeX, sizeY) {
    gCtx.beginPath();
    gCtx.rect(x, y, sizeX, sizeY);
    gCtx.setLineDash([8, 8]);
    gCtx.lineWidth = 5;
    gCtx.strokeStyle = '#fe6e20';
    gCtx.stroke();
    gCtx.closePath();
    gCtx.setLineDash([]);
}



function onAddLine() {
    const line = 'New Line';
    const size = 60;

    gCtx.txtFont = `${size}px impact`

    const width = 220;

    addLine(line, width, size);
    renderMeme();
}


//on change content

function onSetCurrSelection() {
    setSelectedElement();
    renderMeme();
}

function onSetMemeContent(elInput) {
    const meme = getMeme();
    if (!meme.lines.length) return;
    setMemeContent(elInput.name, elInput.value);

    renderMeme();
}

function onSetFontSize(elInput) {
    const meme = getMeme();
    if (!meme.lines.length && !meme.stickers.length) return;
    setFontSize(elInput.value);
    renderMeme();
}

function onRemoveElement() {
    const meme = getMeme();
    const elementType = meme.selectedType;
    if (!meme[elementType].length) return;
    removeElement(elementType);
    onSetCurrSelection();
    renderMeme();
}

function onAlignLine(alignSide) {
    // const line = getCurrElement();
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
