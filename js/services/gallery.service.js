'use strict'
var gFilterBy = '';
var gImgSearchKies = ['stupid', 'political', 'cute', 'animal', 'internet', 'funny', 'weird', 'movies', 'sport', 'danger', 'tv', 'celeb', 'space'];
const gImgs = [
    { id: gNextId++, url: 'img/1.jpg', keywords: ['stupid', 'political'] },
    { id: gNextId++, url: 'img/2.jpg', keywords: ['cute', 'animal'] },
    { id: gNextId++, url: 'img/3.jpg', keywords: ['cute', 'animal'] },
    { id: gNextId++, url: 'img/4.jpg', keywords: ['cute', 'animal', 'internet'] },
    { id: gNextId++, url: 'img/5.jpg', keywords: ['cute', 'success', 'funny'] },
    { id: gNextId++, url: 'img/6.jpg', keywords: ['weird', 'funny'] },
    { id: gNextId++, url: 'img/7.jpg', keywords: ['funny'] },
    { id: gNextId++, url: 'img/8.jpg', keywords: ['weird', 'movies'] },
    { id: gNextId++, url: 'img/9.jpg', keywords: ['funny'] },
    { id: gNextId++, url: 'img/10.jpg', keywords: ['political'] },
    { id: gNextId++, url: 'img/11.jpg', keywords: ['sport'] },
    { id: gNextId++, url: 'img/12.jpg', keywords: ['danger', 'tv'] },
    { id: gNextId++, url: 'img/13.jpg', keywords: ['movies', 'celeb'] },
    { id: gNextId++, url: 'img/14.jpg', keywords: ['movies', 'celeb'] },
    { id: gNextId++, url: 'img/15.jpg', keywords: ['movies'] },
    { id: gNextId++, url: 'img/16.jpg', keywords: ['tv', 'space'] },
    { id: gNextId++, url: 'img/17.jpg', keywords: ['political'] },
    { id: gNextId++, url: 'img/18.jpg', keywords: ['movies'] },
];

function getSearchKies() {
    return gImgSearchKies
}


function getImgs() {
    console.log(gFilterBy);
    if (gFilterBy === '') return gImgs;
    var filteredImgs = gImgs.filter((img) => {
        return img.keywords.find((keyword) => gFilterBy === keyword);
    })
    return filteredImgs;
}


function setFilter(SearchKey) {
    gFilterBy = SearchKey;
}