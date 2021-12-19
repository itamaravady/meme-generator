'use strict'

var gMemeCanvases = []

function initSavedMemes() {
    renderSavedMemes();
    navToSection('saved-memes');
}


function renderSavedMemes() {
    const memes = getSavedMemes();
    if (!memes || !memes.length) return;
    //render memes
    const strHtmls = memes.map((meme) => {
        return `
        <div class="image">
        <button class="btn-remove-meme" onclick="onRemoveMeme('${meme.id}')">X</button>
                 <img src="${meme.img}" onclick="onOpenSavedMeme('${meme.id}')">
         </div>
        `
    });
    document.querySelector('.memes-container').innerHTML = strHtmls.join('');
}

function onOpenSavedMeme(memeId) {
    var meme = getMemeById(memeId);
    uploadImg(meme.img, 'modal-share-container');
    const elModal = document.querySelector('.modal-saved-meme');
    const elImg = elModal.querySelector('img');
    elImg.src = meme.img;
    elModal.classList.add('open-modal');
    document.body.classList.add('menu-open');
}

function onRemoveMeme(memeId) {
    removeMeme(memeId);
    renderSavedMemes();
}