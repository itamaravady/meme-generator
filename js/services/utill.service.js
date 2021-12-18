'use strict'

function makeId(length = 6) {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function uploadImg(canvas, savedMemes, callback) {
    const imgDataUrl = canvas.toDataURL('image/jpeg');
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl, callback) {
        console.log(uploadedImgUrl);
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // return uploadedImgUrl;
        var newImgUrl = uploadedImgUrl.replace('serveForShare.php?id=', 'img/');
        newImgUrl = newImgUrl.concat('.jpg');
        var facebookBtn = getShareBtn(encodedUploadedImgUrl, uploadedImgUrl);
        var newMeme = { id: makeId(9), img: newImgUrl, facebookBtn }
        if (!savedMemes || !savedMemes.length) saveToStorage(getStorageKey(), [newMeme]);
        else {
            savedMemes.push(newMeme);
            saveToStorage(getStorageKey(), savedMemes);
        }
        return newMeme;
    }


    // document.querySelector('.share-container').innerHTML = 
    doUploadImg(imgDataUrl, onSuccess, callback);
}

function getShareBtn(encoded, imgUrl) {
    return `<a class="btn btn-share clean-anchor" href="https://www.facebook.com/sharer/sharer.php?u=${encoded}&t=${encoded}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${imgUrl}&t=${imgUrl}'); return false;">Share!
 </a>`
}

function doUploadImg(imgDataUrl, onSuccess, callback) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            callback(onSuccess(url))
        })
        .catch((err) => {
            console.error(err)
        })
}

function getStickersBatch(idx) {
    var emojis = getStickers();
    const emojiBatch = emojis.splice(idx, 5);
    return emojiBatch;
}

function getStickers() {
    return ['💘', '💤', '⛔', '😀', '😁', '🤣', '😅', '😆', '🥰', '😍', '😎', '😋', '😉', '🙄', '😛', '😪', '🤐', '🤑', '😖', '😤', '🤯', '🥵', '🥶', '😭', '🤡', '😡', '🥳', '😈', '👹', '💀', '😺', '👾', '👽', '👻', '☠', '🤖', '🙉', '🙈', '🙊', '🐸', '🐼', '🐨', '🦍', '🦓', '🐷', '🦝', '🐳', '🐬', '🐟', '🐙', '🦀', '🦅', '🦚', '🐞', '🦇', '👀', '👁', '👄', '🙏', '🎈', '🎉', '🥽', '👓', '🕶', '🩲', '💍', '🎧', '🔪', '💣', '🥙', '🍕', '🍔', '🍟', '🌭', '🥨', '☕', '🍉', '🍅', '🍓', '🍒', '🍑', '🥦', '🍎', '🥑', '🌶', '🍄', '🌲', '🥕', '☀', '🌙', '⚡', '☔', '🌈'];
}

