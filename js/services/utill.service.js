'use strict'

function makeId(length = 6) {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function uploadImg(canvas, savedMemes) {
    const imgDataUrl = canvas.toDataURL('image/jpeg');
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
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
    }


    // document.querySelector('.share-container').innerHTML = 
    doUploadImg(imgDataUrl, onSuccess);
}

function getShareBtn(encoded, imgUrl) {
    return `<a href="https://www.facebook.com/sharer/sharer.php?u=${encoded}&t=${encoded}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${imgUrl}&t=${imgUrl}'); return false;">
    Ready to Share!   
 </a>`
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

