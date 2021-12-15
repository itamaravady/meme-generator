'use strict'


function init() {
    initGalleryController();
}


function showSection(sectionName) {
    const elSection = document.querySelector(`.${sectionName}`);
    elSection.classList.add('open');
}
function hideSection(sectionName) {
    const elSection = document.querySelector(`.${sectionName}`);
    elSection.classList.remove('open');
}