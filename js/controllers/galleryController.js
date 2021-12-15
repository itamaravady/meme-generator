'use strict';

function initGalleryController() {
    renderGallery()
}


function renderGallery() {
    const imgs = onGetImgs();
    const strHtmls = imgs.map((img) => {
        return `
        <div class="image">
            <img src="${img.url}">
        </div> 
        `
    })
    document.querySelector('.images-container').innerHTML = strHtmls.join('')
}

function onGetImgs() {
    return getImgs();
}