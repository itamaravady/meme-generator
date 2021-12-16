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
const gDeletedLines = {
    top: false,
    bot: false,
};


//meme

function getMemeDefault(imgId) {
    return {

        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Let the fun begin',
                position: { x: 20, y: 60 },
                RectPosition: { x: 20, y: 60 },
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
                RectPosition: { x: 20, y: 380 },
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


function getImgUrl() {
    const id = gMeme.selectedImgId;
    const img = _getImgById(id);
    return img.url;
}


function _getImgById(id) {
    return gImgs.find(img => img.id === id);
}


//txt

function addLine(canvsWidth, canvasHeight) {
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
        RectPosition: { x: 20, y },
        leftPosition: { x: 20, y: 20 },
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

function alignLine(alignSide, lineWidth) {

    const line = getCurrLine()
    line.align = alignSide;
    var pos = getTxtLineCoords(line, lineWidth);
    line.RectPosition.x = pos.x;
}

function getTxtLineCoords(line, lineWidth) {
    var { x, y } = line.position;
    switch (line.align) {
        case 'left':
            return { x: 20, y }
            break;
        case 'center':
            return { x: (x - lineWidth / 2), y }
            break;
        case 'right':
            return { x: (x - lineWidth), y }
            break;
    }
}

//text line position


function getClickedLine(clickedPos) {
    var clickedLine;
    gMeme.lines.forEach((line, idx) => {
        const botYCoord = line.position.y;
        const topYCoord = botYCoord - line.size;
        if (clickedPos.y >= topYCoord && clickedPos.y <= botYCoord) clickedLine = { line, idx };
    });
    return clickedLine;
}


// context.measureText(testLine)