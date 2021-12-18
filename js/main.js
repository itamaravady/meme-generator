'use strict'



function init() {
    initGalleryController()
}


function showSection(sectionName) {
    const elSection = document.querySelector(`.${sectionName}`);
    elSection.classList.add('open');
    elSection.classList.add('flex');
}
function hideSection(sectionName) {
    const elSection = document.querySelector(`.${sectionName}`);
    elSection.classList.remove('open');
    elSection.classList.remove('flex');
}
function showButton(sectionName) {
    const elSection = document.querySelector(`.${sectionName}`);
    elSection.classList.add('show-btn');
}
function hideButton(sectionName) {
    const elSection = document.querySelector(`.${sectionName}`);
    elSection.classList.remove('show-btn');
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    //in case about is open
    const elmodal = document.querySelector('.modal');
    elmodal.classList.remove('open-modal');
}

function onOpenModal(strHTML) {
    const elmodal = document.querySelector('.modal');
    elmodal.innerHTML = strHTML;
    elmodal.classList.add('open-modal');
    document.body.classList.add('menu-open');

}

function onOpenAbout() {
    var strHtml = `<h2>About</h2>
    <p>This is a meme generator</p>`

    onOpenModal(strHtml)
}