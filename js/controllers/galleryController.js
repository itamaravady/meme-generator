'use strict';

function initGalleryController() {
    renderGallery()
}


function renderGallery() {
    const imgs = getImgs();
    const strHtmls = imgs.map((img) => {
        return `
        <div class="image">
            <img src="${img.url}" onclick="onImgSelect(${img.id})">
        </div> 
        `
    })
    document.querySelector('.images-container').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    setImg(imgId);
    goToEditor()
}



function goToGallery() {
    initGalleryController();
    hideSection('editor-container');
    hideSection('saved-memes');
    showSection('gallery');
}


