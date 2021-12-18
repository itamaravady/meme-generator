'use strict'



function init() {
    var fontImpact = new FontFace('impact', 'url(../fonts/impact.ttf)');

    fontImpact.load().then(() => { initGalleryController() });

    // initGalleryController()
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