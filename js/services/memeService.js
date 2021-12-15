'use strict'

//globals
var gNextId = 100;
const gImgs = [
    { id: gNextId++, url: 'img/6.jpg', keywords: ['funny', 'political'] },
    { id: gNextId++, url: 'img/10.jpg', keywords: ['funny', 'political'] },
];

const gMeme = {

    selectedImgId: 100,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat bleech',
            size: 50,
            lineWidth: 5,
            font: 'Impact',
            align: 'left',
            fill: 'white',
            stroke: 'black'

        },
    ],

}
//canvas

const gCanvas = {
    width: 500,
    height: 500,
}

function getCanvas() {
    return gCanvas;
}


//meme

function getMeme() {
    return gMeme;
}

function getMemeLineIdx() {
    return 0;
}



//img


function getImgs() {
    return gImgs;
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

function setMemeContent(inputName, inputValue) {
    const memeLineIdx = getMemeLineIdx();
    gMeme.lines[memeLineIdx][inputName] = inputValue;
    console.log(gMeme.lines[memeLineIdx][inputName]);
}