/*jslint browser:true*/
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var curThumb = 0;
var maxThumb = 15;
var NEXT = '[data-image-role="next"]';
var PREV = '[data-image-role="prev"]';






function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict'; 
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault(); 
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) { hideDetails();}
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    var nextButton = getNextButton();
    var prevButton = getPrevButton();
    thumbnails.forEach(addThumbClickHandler);
    nextButton.forEach(nextClicked);
    prevButton.forEach(prevClicked);
    addKeyPressHandler();
}


function getPrevButton(){
    'use strict';
    var prevButton = document.querySelectorAll(PREV);
    var prevArray = [].slice.call(prevButton);
    return prevArray;
}

function prevClicked(prev) {
    'use strict';
    var ar2 = getThumbnailsArray();
    prev.addEventListener('click', function (event) {
        event.preventDefault();
        curThumb = curThumb - 1;
        if (curThumb - 1 < 0) {
            curThumb = maxThumb;
        }
        setDetailsFromThumb(ar2[curThumb]);
        showDetails();
    });
}

function getNextButton(){
    'use strict';
    var nextButton = document.querySelectorAll(NEXT);
    var nextArray = [].slice.call(nextButton);
    return nextArray;
}

function nextClicked(next) {
    'use strict';
    var ar = getThumbnailsArray();
    next.addEventListener('click', function (event) {
        event.preventDefault();
        curThumb = curThumb + 1;
        if (curThumb + 1 > maxThumb) {
            curThumb = 0;
        }
        setDetailsFromThumb(ar[curThumb]);
        showDetails();
    });
} 



initializeEvents();

