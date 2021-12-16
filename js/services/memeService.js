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
                position: { x: 20, y: 100 },
                order: 'top',
                size: 80,
                lineWidth: 2,
                font: 'impact',
                align: 'left',
                fill: '#FFFFFF',
                stroke: '#000000',
            },
            {
                txt: 'or dont...',
                position: { x: 20, y: 550 },
                order: 'bot',
                size: 80,
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
    var y;
    var lineOrder;

    //support adding lines by order from top to bottom
    if (gDeletedLines.top) {
        y = 100;
        lineOrder = 'top';
        gDeletedLines.top = 0;
    }
    else if (gDeletedLines.bot) {
        y = 550;
        lineOrder = 'bot'
        gDeletedLines.bot = 0;
    }
    else {
        y = (canvasHeight + textSize) / 2;
        lineOrder = 'mid';
    }
    //add line
    var line = {
        txt: 'New Line',
        position: { x: 20, y },
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

function setMemeContent(inputName, inputValue) {
    const line = getCurrLine();
    line[inputName] = inputValue;
}


function setLineFontSize(inputValue) {
    const line = getCurrLine();
    line.size += +inputValue;
}

function alignLine(alignSide, alignCoord) {
    const line = getCurrLine()
    line.align = alignSide;
    line.position.x = alignCoord[alignSide];
    console.log(alignSide);
    console.log(alignCoord[alignSide]);
}

//text line position

// function isLineClicked(clickedPos) {
//     const line = getCurrLine();
//     var clickedLine = getClickedLine(clickedPos);
//     return isClicked;
// }

function getClickedLine(clickedPos) {
    var clickedLine;
    gMeme.lines.forEach((line, idx) => {
        const clickedYCoord = clickedPos.y
        const botYCoord = line.position.y;
        const topYCoord = botYCoord - line.size;
        if (clickedYCoord >= topYCoord && clickedYCoord <= botYCoord) clickedLine = { line, idx };
    });
    return clickedLine;
}