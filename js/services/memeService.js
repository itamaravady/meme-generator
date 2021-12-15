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

const gMeme = {

    selectedImgId: 100,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Let the fun begin',
            position: { x: 50, y: 80 },
            size: 80,
            lineWidth: 2,
            font: 'impact',
            align: 'left',
            fill: '#FFFFFF',
            stroke: '#000000',
        },
        {
            txt: 'or dont...',
            position: { x: 50, y: 650 },
            size: 80,
            lineWidth: 2,
            font: 'poppins',
            align: 'left',
            fill: '#FFFFFF',
            stroke: '#000000',
        },
    ],

}



//meme

function getMeme() {
    return gMeme;
}

function getMemeLineIdx() {
    return gMeme.selectedLineIdx;
}



//img


function getImgs() {
    return gImgs;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
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

function removeLine() {
    const lineIdx = getMemeLineIdx();
    gMeme.lines.splice(lineIdx, 1)
}

function setMemeContent(inputName, inputValue) {
    const memeLineIdx = getMemeLineIdx();
    gMeme.lines[memeLineIdx][inputName] = inputValue;
}


function setLineFontSize(inputValue) {
    const memeLineIdx = getMemeLineIdx();
    gMeme.lines[memeLineIdx].size += +inputValue;
    console.log(inputValue);
}