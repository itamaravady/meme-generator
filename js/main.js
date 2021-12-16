'use strict'


function init() {
    var fontImpact = new FontFace('impact', 'url(../fonts/impact.ttf)');

    fontImpact.load().then(() => { initGalleryController() });

    // initGalleryController()
}


function showSection(sectionName) {
    const elSection = document.querySelector(`.${sectionName}`);
    elSection.classList.add('open');
}
function hideSection(sectionName) {
    const elSection = document.querySelector(`.${sectionName}`);
    elSection.classList.remove('open');
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}