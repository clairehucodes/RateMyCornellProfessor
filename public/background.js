/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

// @ts-ignore
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var method = request.method ? request.method.toUpperCase() : 'GET';
    var headers = new Headers();
    if (method === 'POST') {
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //res.header("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");
    }
    var config = {
        method: method,
        headers: headers,
        mode: 'cors',
        cache: 'default',
    };
    switch (request.action) {
        case 'showIcon':
            // @ts-ignore
            chrome.pageAction.show(sender.tab.id);
            return true;
        case 'searchForProfessor':
            console.log('thats so fetch!');
            fetch(request.url, config)
                .then(function (res) { return res.text(); })
                .then(function (pageText) {
                console.log('<<<< fetch happened');
                var searchPage = document.createElement('html');
                searchPage.innerHTML = pageText;
                // const profId: HTMLElement = searchPage.querySelector('.listing.PROFESSOR');
                var profId = searchPage.querySelector('.listing.PROFESSOR');
                var ret = (profId) ?
                    profId.getElementsByTagName('a')[0].getAttribute('href') :
                    profId;
                console.debug(ret);
                sendResponse({ profId: ret });
            })
                .catch(function (err) {
                console.debug('[ERROR: searchForProfessor]');
                console.debug(err);
                sendResponse();
                return false;
            });
            return true;
        case 'getOverallScore':
            fetch(request.url)
                .then(function (res) { return res.text(); })
                .then(function (pageText) {
                console.log('"@@@@@@@@@@@@"');
                console.log(pageText);
                var ratingPage = document.createElement('html');
                ratingPage.innerHTML = pageText;
                var profRatingEle = ratingPage.getElementsByClassName('RatingValue__Numerator-qw8sqy-2 liyUjw').item(0);
                console.log('++++++++');
                console.log(profRatingEle);
                //console.log(ratingPage.getElementsByClassName('RatingValue__Numerator'))
                var profRating;
                if (profRatingEle != null) {
                    console.log('^^^^^^^^^^');
                    console.log(profRatingEle);
                    profRating = profRatingEle.textContent;
                    sendResponse({ profRating: profRating });
                }
                else {
                    console.log('%%%%%%%%%%');
                    console.debug('[ERROR: ratingPage.querySelector(div.grade) is null]');
                    sendResponse();
                }
            })
                .catch(function (err) {
                console.log('caught!!!!');
                console.debug('[ERROR: getOverallScore]');
                console.debug(err);
                sendResponse();
                return false;
            });
            return true;
        default:
            console.debug("Action " + request.action + " not recognized");
            break;
    }
});

/******/ })()
;
//# sourceMappingURL=background.js.map