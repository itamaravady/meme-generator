'use strict'

function makeId(length = 6) {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getStickersBatch(idx) {
    var emojis = getStickers();
    const emojiBatch = emojis.splice(idx, 5);
    return emojiBatch;
}

function getStickers() {
    return ['💘', '💤', '⛔', '😀', '😁', '🤣', '😅', '😆', '🥰', '😍', '😎', '😋', '😉', '🙄', '😛', '😪', '🤐', '🤑', '😖', '😤', '🤯', '🥵', '🥶', '😭', '🤡', '😡', '🥳', '😈', '👹', '💀', '😺', '👾', '👽', '👻', '☠', '🤖', '🙉', '🙈', '🙊', '🐸', '🐼', '🐨', '🦍', '🦓', '🐷', '🦝', '🐳', '🐬', '🐟', '🐙', '🦀', '🦅', '🦚', '🐞', '🦇', '👀', '👁', '👄', '🙏', '🎈', '🎉', '🥽', '👓', '🕶', '🩲', '💍', '🎧', '🔪', '💣', '🥙', '🍕', '🍔', '🍟', '🌭', '🥨', '☕', '🍉', '🍅', '🍓', '🍒', '🍑', '🥦', '🍎', '🥑', '🌶', '🍄', '🌲', '🥕', '☀', '🌙', '⚡', '☔', '🌈'];
}

