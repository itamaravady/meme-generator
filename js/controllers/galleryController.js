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

function goToEditor() {
    initMemeController();
    hideSection('gallery');
    showSection('editor-container');
    // document.querySelector('.editor').classList.add('flex');
}


