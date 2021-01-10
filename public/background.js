/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/

// @ts-ignore
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var method = request.method ? request.method.toUpperCase() : 'GET';
    var headers = new Headers();
    if (method === 'POST')
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
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
            fetch(request.url, config)
                .then(function (res) { return res.text(); })
                .then(function (pageText) {
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
            fetch(request.url, config)
                .then(function (res) { return res.text(); })
                .then(function (pageText) {
                var ratingPage = document.createElement('html');
                ratingPage.innerHTML = pageText;
                var profRatingEle = ratingPage.querySelector('div.grade');
                var profRating;
                if (profRatingEle != null) {
                    profRating = profRatingEle.textContent;
                    sendResponse({ profRating: profRating });
                }
                else {
                    console.debug('[ERROR: ratingPage.querySelector(div.grade) is null]');
                    sendResponse();
                }
            })
                .catch(function (err) {
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