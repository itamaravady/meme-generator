'use strict'

//globals
var gNextId = 100;

var gMeme;
const MEME_STORAGE_KEY = 'memeDB';
var gSavedMemes = loadFromStorage(MEME_STORAGE_KEY);
const gDeletedLines = {
    top: false,
    bot: false,
};


function getStorageKey() {
    return MEME_STORAGE_KEY;
}

//meme

function createMeme(imgId) {
    return {
        selectedImgId: imgId,
        selectionIdx: 0,
        selectedType: 'lines',
        lines: [
            {
                txt: 'Text goes here',
                position: { x: 20, y: 60 },
                // selectionPos: { x: 20, y: 60 },
                isDrag: false,
                order: 'top',
                size: 50,
                width: 300,
                lineWidth: 2,
                font: 'impact',
                align: 'left',
                fill: '#FFFFFF',
                stroke: '#000000',
            },
            {
                txt: 'And here...',
                position: { x: 20, y: 380 },
                // selectionPos: { x: 20, y: 380 },
                isDrag: false,
                order: 'bot',
                size: 50,
                width: 215,
                lineWidth: 2,
                font: 'impact',
                align: 'left',
                fill: '#FFFFFF',
                stroke: '#000000',
            },
        ],
        stickers: [],
    }
}


function getMeme() {
    return gMeme;
}

function getSavedMemes() {
    return gSavedMemes;
}


function saveMeme(canvas) {
    console.log('saving');
    gSavedMemes
    const imgDataUrl = canvas.toDataURL("image/jpeg");
    var newMeme = {
        id: makeId(),
        img: imgDataUrl,
    }

    if (!gSavedMemes || !gSavedMemes.length) saveToStorage(getStorageKey(), [newMeme]);
    else {
        gSavedMemes.push(newMeme);
        saveToStorage(getStorageKey(), gSavedMemes);
    }
    document.querySelector('.share-container').innerText = 'Meme saved!'
}

function removeMeme(memeId) {
    const memeIdx = getMemeIdxById(memeId)
    gSavedMemes.splice(memeIdx, 1);
    saveToStorage(getStorageKey(), gSavedMemes);
}

function getCurrElement() {
    const type = getSelectedElementType();
    if (!gMeme.lines.length && !gMeme.stickers.length) return null;
    return gMeme[type][gMeme.selectionIdx];
}

function getSelectedElementType() {
    return gMeme.selectedType
}

//img



function setImg(imgId) {
    gMeme = createMeme(imgId);
}


function getImgUrl(meme = gMeme) {
    const id = meme.selectedImgId;
    const img = _getImgById(id);
    return img.url;
}


function _getImgById(id) {
    return gImgs.find(img => img.id === id);
}


//txt

function addLine(line, width, size) {
    var textSize = createMeme(100).lines[0].size;
    const canvasDim = getCanvasSize();
    var y;
    var lineOrder;

    //support adding lines by order from top to bottom
    if (gDeletedLines.top) {
        y = 20 + textSize;
        lineOrder = 'top';
        gDeletedLines.top = 0;
    }
    else if (gDeletedLines.bot) {
        y = canvasDim.height - 20;
        lineOrder = 'bot'
        gDeletedLines.bot = 0;
    }
    else {
        y = (canvasDim.height + textSize) / 2;
        lineOrder = 'mid';
    }


    //add line
    var newLine = {
        txt: line,
        position: { x: 20, y },
        // selectionPos: { x: 20, y },
        isDrag: false,
        order: lineOrder,
        size,
        width,
        lineWidth: 2,
        font: 'impact',
        align: 'left',
        fill: '#FFFFFF',
        stroke: '#000000',
    };
    gMeme.lines.push(newLine);
    const newLineIdx = gMeme.lines.length - 1;
    setSelectedElement(newLineIdx, 'lines');
}



function removeElement(type) {
    const elementIdx = gMeme.selectionIdx;
    const element = getCurrElement();
    if (type === 'lines') {
        gDeletedLines[element.order] = 1;
        gMeme.lines.splice(elementIdx, 1);
    } else {
        gMeme.stickers.splice(elementIdx, 1);
    }
}

function setSelectedElement(chosenSelectionIdx, type = gMeme.selectedType) {
    if (chosenSelectionIdx === undefined) {
        var selectionIdx = ++gMeme.selectionIdx;
        gMeme.selectionIdx = (selectionIdx >= gMeme[type].length) ? 0 : selectionIdx;
        if (gMeme.stickers.length < 2) gMeme.selectedType = 'lines';
        return;
    }


    gMeme.selectedType = type;
    gMeme.selectionIdx = chosenSelectionIdx;
}

function isCurrElement(idx, type) {
    const currSelectedType = getSelectedElementType();
    return (gMeme.selectionIdx === idx && currSelectedType === type);
}


function addSticker(stickerStr) {
    const canvasDim = getCanvasSize();
    const sticker = {
        sticker: stickerStr,
        position: { x: (canvasDim.width / 2 - 15), y: (canvasDim.height / 2 + 5) },
        // selectionPos: { x: (canvasDim.width / 2 - 5), y: (canvasDim.height / 2 + 5) },
        size: 60,
        width: 60,
        isDrag: false,
    }
    gMeme.stickers.push(sticker);
    const selectedIdx = gMeme.stickers.length - 1;
    setSelectedElement(selectedIdx, 'stickers');
}


function setMemeContent(inputName, inputValue) {
    const line = getCurrElement();
    const keepLength = line.txt.length;
    line[inputName] = inputValue;
    const width = line.width * line.txt.length / keepLength
    line.width = width
}

function getMemeById(memeId) {
    var memes = loadFromStorage(MEME_STORAGE_KEY);
    return memes.find((meme) => meme.id === memeId)
}
function getMemeIdxById(memeId) {
    var memes = loadFromStorage(MEME_STORAGE_KEY);
    return memes.findIndex((meme) => meme.id === memeId)
}


function setFontSize(inputValue) {
    const element = getCurrElement();
    var keepSize = element.size;
    element.size += +inputValue;
    // const width = getTextWidth(inputValue);
    const width = element.width * element.size / keepSize;
    element.width = width;
}


//text line position

function alignLine(alignSide) {

    const line = getCurrElement();
    //delete later
    line.align = alignSide;
    var pos = getAlignCoords(line);

    line.position = pos;
    // line.selectionPos = line.position;
}

function getClickedCanvasElement(clickedPos) {
    var clickedElement
    gMeme.lines.forEach((line, idx) => {
        if (checkIfElementClicked(line, clickedPos)) clickedElement = { element: line, idx, type: 'lines' };
    });
    if (clickedElement) return clickedElement;
    gMeme.stickers.forEach((sticker, idx) => {
        if (checkIfElementClicked(sticker, clickedPos)) clickedElement = { element: sticker, idx, type: 'stickers' };
    });
    if (clickedElement) return clickedElement;
}

function checkIfElementClicked(element, clickedPos) {
    const botYCoord = element.position.y;
    const topYCoord = botYCoord - element.size;

    const leftXCoord = element.position.x;
    const rightXCoord = leftXCoord + element.width;
    // console.log('yb:', botYCoord, 'xl:', leftXCoord, 'yt:', topYCoord, 'xr:', rightXCoord)
    if (clickedPos.y >= topYCoord && clickedPos.y <= botYCoord &&
        clickedPos.x >= leftXCoord && clickedPos.x <= rightXCoord) {
        return true;
    }
    return false;
}

function setElementDrag(element, isDrag) {
    element.isDrag = isDrag;
}

function moveElement(dx, dy) {
    const element = getCurrElement();
    element.position.x += dx;
    element.position.y += dy;
    // //move selection rect
    // element.selectionPos.x += dx;
    // element.selectionPos.y += dy;
}