'use strict';

function initGalleryController() {
    renderGallery()
    renderSearchKies()
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

function onFilterBy(elSearchKey) {
    setFilter(elSearchKey.value);
    renderGallery()
}

function goToGallery() {
    initGalleryController();
    document.querySelector('.share-container').style.display = "none";
    hideSection('editor-container');
    hideSection('saved-memes');
    showSection('gallery');
}


function renderSearchKies() {
    const searchKies = getSearchKies();
    const strHtmls = searchKies.map((searchKey) => {
        return `
            <option value="${searchKey}">
        `
    })
    document.querySelector('datalist.search').innerHTML = strHtmls.join('');
}

