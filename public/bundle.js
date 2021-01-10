/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.ts":
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
/***/ (function() {


/**
 * Rate My Cornell Professors
 * JavaScript file to scrape information and replace it in Class Roster
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//import { restricted } from './restricted';
//import { subs } from './subs';
var BASE_URL = 'http://www.ratemyprofessors.com';
var BASE_SEARCH_URL = 'http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=Cornell+University&schoolID=298&query=';
var GREEN = '#1FB81C';
var YELLOW = '#FEEB00';
var RED = '#FC4433';
// Use the same loading indicator that the page already does; don't host our own
var LOADING_INDICATOR = '<img src="https://i.pinimg.com/originals/a6/8f/b5/a68fb58aa1ace26b0008f5a5dbcebfd2.jpg">';
// The divs that contain possible locations for professor names to populate
var $COURSE_LIST_AREAS = [
    document.getElementsByClassName('class-listing'),
];
// @ts-ignore
// chrome.runtime.sendMessage({ action: 'showIcon' });
// Watch each of the areas where professor names may appear for changes. When detected, rate each professor.
var getOverallScoresObserver = new MutationObserver(rateProfessorsOnPage);
$COURSE_LIST_AREAS.forEach(function (area) { return getOverallScoresObserver.observe(area, { childList: true }); });
/**
 * Rates each of the professors currently in view.
 */
function rateProfessorsOnPage() {
    var _this = this;
    var professorNodes = getProfessorNodes();
    // Group nodes by professor name. This way, only one API call needs to be made per professor, then that score
    // is assigned to each of the nodes with that professor
    var groupedProfessorNodes = groupProfessors(professorNodes);
    Object.keys(groupedProfessorNodes).forEach(function (name) { return __awaiter(_this, void 0, void 0, function () {
        var score_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(isValidProfessor(name) && isUnratedProfessor(name))) return [3 /*break*/, 2];
                    groupedProfessorNodes[name].forEach(setIsLoading);
                    return [4 /*yield*/, getProfessorId(name).then(getOverallScore)];
                case 1:
                    score_1 = _a.sent();
                    groupedProfessorNodes[name].forEach(function (node) { return setScore(name, node, score_1); });
                    return [3 /*break*/, 3];
                case 2:
                    if (isUnratedProfessor(name)) {
                        groupedProfessorNodes[name].forEach(function (node) { return setInvalidScore(name, node); });
                    }
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    groupedProfessorNodes[name].forEach(function (node) { return setInvalidScore(name, node); });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
/**
 * Returns an array of nodes of each search result's professor field
 */
function getProfessorNodes() {
    var returnVal;
    returnVal = document.getElementById('tooltip-iws');
    if (returnVal != null) {
        returnVal = returnVal.getAttribute('data-content');
    }
    return returnVal;
}
/**
 * Gets the part of the URL that needs to be appended to the base URL to reach the professor's page
 * Example return: '/ShowRatings.jsp?tid=2301025'
 */
function getProfessorId(profName) {
    var config = {
        action: 'searchForProfessor',
        method: 'POST',
        url: BASE_SEARCH_URL + convertName(profName)
    };
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        chrome.runtime.sendMessage(config, function (res) {
            if (res.profId) {
                resolve(res.profId);
            }
            else {
                reject('Search result not found');
            }
        });
    });
}
/**
 * Scrapes the RMP page for the professor at <profId> for their overall score and returns it
 */
function getOverallScore(profId) {
    var config = {
        action: 'getOverallScore',
        method: 'POST',
        url: BASE_URL + profId,
    };
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        chrome.runtime.sendMessage(config, function (res) {
            if (res.profRating) {
                if (res.profRating === '0.0' || res.profRating.includes('Grade received')) {
                    reject('Professor not rated');
                }
                else {
                    resolve(parseFloat(res.profRating));
                }
            }
            else {
                reject('No rating found');
            }
        });
    });
}
/**
 * Converts a name from it's notation as shown in the search results to a form
 * that can be appended to the base RateMyProfessors URL in order to emulate
 * a search.
 */
function convertName(original) {
    var regex = /\w+(, )\w+/g;
    var temp = regex.exec(original);
    //   if (temp[0].trim() in subs) {
    //     temp[0] = subs[temp[0].trim()];
    //   }
    return encodeURIComponent(temp[0]);
}
/**
 * Returns a color based on <rating>. These numbers match the values on RateMyProfessors.com
 */
function getColor(rating) {
    if (rating >= 3.5) {
        return GREEN;
    }
    if (rating < 2.5) {
        return RED;
    }
    return YELLOW;
}
/**
 * Given an array of elements, groups them by professor name and returns an object
 * where the key represents the professor name and the value is an array of the nodes
 * that correspond to that professor.
 *
 * Slight modification of https://stackoverflow.com/questions/14446511/what-is-the-most-efficient-method-to-groupby-on-a-javascript-array-of-objects
 */
function groupProfessors(vals) {
    return Array.from(vals).reduce(function (ret, val) {
        (ret[val.textContent.trim()] = ret[val.textContent.trim()] || []).push(val);
        return ret;
    }, {});
}
/**
 * Returns TRUE if the professor is a single, non-Staff professor. Staff professors and
 * courses with multiple professors return FALSE.
 */
function isValidProfessor(name) {
    return (name !== '' && !name.includes('Staff'));
}
/**
 * Return TRUE if the professor is not already rated or is in the process of being rated.
 * FALSE otherwise.
 */
function isUnratedProfessor(name) {
    return !name.includes(' - ');
}
/**
 * Adds 'N/A' as the score to professor on the search page
 */
function setInvalidScore(name, node) {
    setScore(name, node);
}
/**
 * Appends the loading indicator next to professor names in the results list
 */
function setIsLoading(node) {
    node.innerHTML = node.innerHTML + ' - ' + LOADING_INDICATOR;
}
/**
 * Adds the score and changes the color of the professor on the search page
 */
function setScore(name, node, score) {
    if (score) {
        node.textContent = name + ' - ' + score.toFixed(1);
        node.style.color = getColor(score);
    }
    else {
        node.textContent = name + ' - N/A';
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__["./src/content.ts"]();
/******/ })()
;
//# sourceMappingURL=bundle.js.map