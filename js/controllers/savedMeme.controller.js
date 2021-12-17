function initSavedMemeController() {
    renderSavedMemes()
}


function goToSavedMemes() {
    initSavedMemeController();
    hideSection('editor-container');
    hideSection('gallery');
    showSection('saved-memes');
}

function renderSavedMemes() {
    const imgs = getImgs();
    const strHtmls = imgs.map((img) => {
        return `
        <div class="image">
            <img src="${img.url}">
        </div> 
        `
    })
    document.querySelector('.memes-container').innerHTML = strHtmls.join('')
}

// function onImgSelect(imgId) {
//     setImg(imgId);
//     goToEditor()
// }

// function goToEditor() {
//     initMemeController();
//     hideSection('gallery');
//     showSection('editor-container');
//     // document.querySelector('.editor').classList.add('flex');
// }