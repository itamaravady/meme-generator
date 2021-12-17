'use strict'

var gMemeCanvases = []

function initSavedMemeController() {
    renderSavedMemes()
}


function goToSavedMemes() {
    initSavedMemeController();
    hideSection('editor-container');
    hideSection('gallery');
    showSection('saved-memes');
}

function renderSavedMemes() {
    const storageKey = getStorageKey();
    const memes = loadFromStorage(storageKey);
    if (!memes || !memes.length) return;
    //render memes
    const strHtmls = memes.map((meme) => {
        return `
        <div class="image ">
                 <img src="${meme.img}" onclick="showSavedMeme('${meme.id}')">
         </div>
        `
    });
    document.querySelector('.memes-container').innerHTML = strHtmls.join('');
}

function showSavedMeme(memeId) {
    //TODO - show meme modal with facebook button

    console.log('memeId:', memeId);
}

//TODO selete meme