'use strict'

var gMemeCanvases = []

function initSavedMemeController() {
    renderSavedMemes()
}


function onGoToSavedMemes() {
    initSavedMemeController();
    document.querySelector('.share-container').style.display = "none";
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
        <div class="image">
                 <img src="${meme.img}" onclick="onOpenSavedMeme('${meme.id}')">
         </div>
        `
    });
    document.querySelector('.memes-container').innerHTML = strHtmls.join('');
}

function onOpenModal(strHTML) {
    const elmodal = document.querySelector('.modal');
    elmodal.innerHTML = strHTML;
    elmodal.classList.add('open-modal');
    document.body.classList.add('menu-open');

}

function onOpenSavedMeme(memeId) {
    var meme = getMemeById(memeId);
    var strHtml = `
    ${meme.facebookBtn}
    <img src="${meme.img}">
    `

    onOpenModal(strHtml)
}