'use strict';

function initGallery() {
    renderGallery()
    renderSearchKeys()
    navToSection('gallery');
}

function onImgSelect(imgId) {
    setImg(imgId);
    initEditor();
    navToSection('editor');
}


function navToSection(sectionName) {
    //close current section if exists
    const currOpenSections = document.querySelectorAll('.open');
    currOpenSections.forEach((section => section.classList.remove('open')));

    //open requested section
    document.querySelector(`.${sectionName}`).classList.add('open');
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

function renderSearchKeys() {
    const searchKies = getSearchKies();
    const strHtmls = searchKies.map((searchKey) => {
        return `
            <option value="${searchKey}">
            `
    })
    document.querySelector('datalist.search').innerHTML = strHtmls.join('');
}


function onFilterBy(elSearchKey) {
    setFilter(elSearchKey.value);
    renderGallery()
}



function onOpenAbout() {
    const elmodal = document.querySelector('.modal-about');
    elmodal.classList.add('open-modal');
    document.body.classList.add('menu-open');
}

function toggleMenu() {

    document.body.classList.toggle('menu-open');
    //in case about is open
    const elModals = document.querySelectorAll('.modal');
    elModals.forEach((elModal) => elModal.classList.remove('open-modal'));
}
