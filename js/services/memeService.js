'use strict'

//globals
var gNextId = 100;
const gImgs = [
    { id: gNextId++, url: 'img/7.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/9.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/9.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/9.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/9.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/9.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/9.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/9.jpg', keywords: ['funny', 'political'] },
];

var gMeme;
const MEME_STORAGE_KEY = 'memeDB';
const gDeletedLines = {
    top: false,
    bot: false,
};


function getStorageKey() {
    return MEME_STORAGE_KEY;
}

//meme

function getMemeDefault(imgId) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: 0,


        lines: [
            {
                txt: 'Let the fun begin',
                position: { x: 20, y: 60 },
                selectionPos: { x: 20, y: 60 },
                idDrag: false,
                order: 'top',
                size: 50,
                lineWidth: 2,
                font: 'impact',
                align: 'left',
                fill: '#FFFFFF',
                stroke: '#000000',
            },
            {
                txt: 'or dont...',
                position: { x: 20, y: 380 },
                selectionPos: { x: 20, y: 380 },
                idDrag: false,
                order: 'bot',
                size: 50,
                lineWidth: 2,
                font: 'impact',
                align: 'left',
                fill: '#FFFFFF',
                stroke: '#000000',
            },
        ],
    }
}


function getMeme() {
    return gMeme;
}

function saveMeme(canvas) {


    const savedMemes = loadFromStorage(MEME_STORAGE_KEY);
    uploadImg(canvas, savedMemes);
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}



//img


function getImgs() {
    return gImgs;
}

function setImg(imgId) {
    gMeme = getMemeDefault(imgId);
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

function addLine(canvasHeight) {
    var textSize = getMemeDefault(100).lines[0].size;
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
        console.log(canvasHeight);
        lineOrder = 'bot'
        gDeletedLines.bot = 0;
    }
    else {
        y = (canvasDim.height + textSize) / 2;
        lineOrder = 'mid';
    }


    //add line
    var line = {
        txt: 'New Line',
        position: { x: 20, y },
        selectionPos: { x: 20, y },
        idDrag: false,
        order: lineOrder,
        size: 80,
        lineWidth: 2,
        font: 'impact',
        align: 'left',
        fill: '#FFFFFF',
        stroke: '#000000',
    };
    gMeme.lines.push(line);
    const newLineIdx = gMeme.lines.length - 1;
    setCurrLine(newLineIdx);
}



function removeLine() {
    const lineIdx = gMeme.selectedLineIdx;
    const line = getCurrLine();
    gDeletedLines[line.order] = 1;
    gMeme.lines.splice(lineIdx, 1);
}

function setCurrLine(chosenLineIdx) {
    if (chosenLineIdx === undefined) {
        var lineIdx = ++gMeme.selectedLineIdx;
        gMeme.selectedLineIdx = (lineIdx >= gMeme.lines.length) ? 0 : lineIdx;
        return;
    }
    gMeme.selectedLineIdx = chosenLineIdx;
}

function isCurrLine(idx) {
    return (gMeme.selectedLineIdx === idx);
}

function setMemeContent(inputName, inputValue) {
    const line = getCurrLine();
    line[inputName] = inputValue;
}


function setLineFontSize(inputValue) {
    const line = getCurrLine();
    line.size += +inputValue;
}


//text line position

function alignLine(alignSide) {

    const line = getCurrLine();
    line.align = alignSide;
    var pos = getAlignCoords(line);
    line.position = pos;
    var selectionPos = getSelectionPos(line);
    line.selectionPos = selectionPos;
}

function getSelectionPos(line) {
    var { x, y } = line.position;
    const lineWidth = getTextWidth(line);

    switch (line.align) {
        case 'left':
            return { x, y };
        case 'center':
            return { x: (x - lineWidth / 2), y };
        case 'right':
            return { x: (x - lineWidth), y };
    }
}

function getClickedLine(clickedPos) {
    var clickedLine;
    gMeme.lines.forEach((line, idx) => {
        const botYCoord = line.position.y;
        const topYCoord = botYCoord - line.size;
        if (clickedPos.y >= topYCoord && clickedPos.y <= botYCoord) clickedLine = { line, idx };
    });
    return clickedLine;
}

function setLineDrag(line, isDrag) {
    line.isDrag = isDrag;
}

function moveTxtLine(dx, dy) {
    const line = getCurrLine();
    line.position.x += dx;
    line.position.y += dy;
    //move selection rect
    line.selectionPos.x += dx;
    line.selectionPos.y += dy;
}