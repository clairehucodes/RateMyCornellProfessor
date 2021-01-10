/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.ts":
/*!************************!*\
  !*** ./src/content.ts ***!
  \************************/
/***/ (function() {

<<<<<<< HEAD
eval("\n/**\n * Rate My Cornell Professors\n * JavaScript file to scrape information and replace it in Class Roster\n */\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n//import { restricted } from './restricted';\n//import { subs } from './subs';\nvar BASE_URL = 'http://www.ratemyprofessors.com';\nvar BASE_SEARCH_URL = 'http://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=Cornell+University&schoolID=298&query=';\nvar GREEN = '#1FB81C';\nvar YELLOW = '#FEEB00';\nvar RED = '#FC4433';\n// Use the same loading indicator that the page already does; don't host our own\nvar LOADING_INDICATOR = '<img src=\"https://i.pinimg.com/originals/a6/8f/b5/a68fb58aa1ace26b0008f5a5dbcebfd2.jpg\">';\n// The divs that contain possible locations for professor names to populate\nvar $COURSE_LIST_AREAS = [\n    document.getElementsByClassName('class-listing'),\n];\n// @ts-ignore\n// chrome.runtime.sendMessage({ action: 'showIcon' });\n// Watch each of the areas where professor names may appear for changes. When detected, rate each professor.\nvar getOverallScoresObserver = new MutationObserver(rateProfessorsOnPage);\nconsole.log($COURSE_LIST_AREAS);\nif ($COURSE_LIST_AREAS != undefined) {\n    $COURSE_LIST_AREAS.forEach(function (area) { return getOverallScoresObserver.observe(area, { childList: true }); });\n}\n/**\n * Rates each of the professors currently in view.\n */\nfunction rateProfessorsOnPage() {\n    var _this = this;\n    var professorNodes = getProfessorNodes();\n    // Group nodes by professor name. This way, only one API call needs to be made per professor, then that score\n    // is assigned to each of the nodes with that professor\n    var groupedProfessorNodes = groupProfessors(professorNodes);\n    Object.keys(groupedProfessorNodes).forEach(function (name) { return __awaiter(_this, void 0, void 0, function () {\n        var score_1, err_1;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    _a.trys.push([0, 4, , 5]);\n                    if (!(isValidProfessor(name) && isUnratedProfessor(name))) return [3 /*break*/, 2];\n                    groupedProfessorNodes[name].forEach(setIsLoading);\n                    return [4 /*yield*/, getProfessorId(name).then(getOverallScore)];\n                case 1:\n                    score_1 = _a.sent();\n                    groupedProfessorNodes[name].forEach(function (node) { return setScore(name, node, score_1); });\n                    return [3 /*break*/, 3];\n                case 2:\n                    if (isUnratedProfessor(name)) {\n                        groupedProfessorNodes[name].forEach(function (node) { return setInvalidScore(name, node); });\n                    }\n                    _a.label = 3;\n                case 3: return [3 /*break*/, 5];\n                case 4:\n                    err_1 = _a.sent();\n                    groupedProfessorNodes[name].forEach(function (node) { return setInvalidScore(name, node); });\n                    return [3 /*break*/, 5];\n                case 5: return [2 /*return*/];\n            }\n        });\n    }); });\n}\n/**\n * Returns an array of nodes of each search result's professor field\n */\nfunction getProfessorNodes() {\n    var returnVal;\n    returnVal = document.getElementById('tooltip-iws')[0];\n    if (returnVal != null) {\n        returnVal = returnVal.getAttribute('data-content');\n    }\n    return returnVal;\n}\n/**\n * Gets the part of the URL that needs to be appended to the base URL to reach the professor's page\n * Example return: '/ShowRatings.jsp?tid=2301025'\n */\nfunction getProfessorId(profName) {\n    var config = {\n        action: 'searchForProfessor',\n        method: 'POST',\n        url: BASE_SEARCH_URL + convertName(profName)\n    };\n    return new Promise(function (resolve, reject) {\n        // @ts-ignore\n        chrome.runtime.sendMessage(config, function (res) {\n            if (res.profId) {\n                resolve(res.profId);\n            }\n            else {\n                reject('Search result not found');\n            }\n        });\n    });\n}\n/**\n * Scrapes the RMP page for the professor at <profId> for their overall score and returns it\n */\nfunction getOverallScore(profId) {\n    var config = {\n        action: 'getOverallScore',\n        method: 'POST',\n        url: BASE_URL + profId,\n    };\n    return new Promise(function (resolve, reject) {\n        // @ts-ignore\n        chrome.runtime.sendMessage(config, function (res) {\n            if (res.profRating) {\n                if (res.profRating === '0.0' || res.profRating.includes('Grade received')) {\n                    reject('Professor not rated');\n                }\n                else {\n                    resolve(parseFloat(res.profRating));\n                }\n            }\n            else {\n                reject('No rating found');\n            }\n        });\n    });\n}\n/**\n * Converts a name from it's notation as shown in the search results to a form\n * that can be appended to the base RateMyProfessors URL in order to emulate\n * a search.\n */\nfunction convertName(original) {\n    var regex = /\\w+(, )\\w+/g;\n    var temp = regex.exec(original);\n    //   if (temp[0].trim() in subs) {\n    //     temp[0] = subs[temp[0].trim()];\n    //   }\n    return encodeURIComponent(temp[0]);\n}\n/**\n * Returns a color based on <rating>. These numbers match the values on RateMyProfessors.com\n */\nfunction getColor(rating) {\n    if (rating >= 3.5) {\n        return GREEN;\n    }\n    if (rating < 2.5) {\n        return RED;\n    }\n    return YELLOW;\n}\n/**\n * Given an array of elements, groups them by professor name and returns an object\n * where the key represents the professor name and the value is an array of the nodes\n * that correspond to that professor.\n *\n * Slight modification of https://stackoverflow.com/questions/14446511/what-is-the-most-efficient-method-to-groupby-on-a-javascript-array-of-objects\n */\nfunction groupProfessors(vals) {\n    return Array.from(vals).reduce(function (ret, val) {\n        (ret[val.textContent.trim()] = ret[val.textContent.trim()] || []).push(val);\n        return ret;\n    }, {});\n}\n/**\n * Returns TRUE if the professor is a single, non-Staff professor. Staff professors and\n * courses with multiple professors return FALSE.\n */\nfunction isValidProfessor(name) {\n    return (name !== '' && !name.includes('Staff'));\n}\n/**\n * Return TRUE if the professor is not already rated or is in the process of being rated.\n * FALSE otherwise.\n */\nfunction isUnratedProfessor(name) {\n    return !name.includes(' - ');\n}\n/**\n * Adds 'N/A' as the score to professor on the search page\n */\nfunction setInvalidScore(name, node) {\n    setScore(name, node);\n}\n/**\n * Appends the loading indicator next to professor names in the results list\n */\nfunction setIsLoading(node) {\n    node.innerHTML = node.innerHTML + ' - ' + LOADING_INDICATOR;\n}\n/**\n * Adds the score and changes the color of the professor on the search page\n */\nfunction setScore(name, node, score) {\n    if (score) {\n        node.textContent = name + ' - ' + score.toFixed(1);\n        node.style.color = getColor(score);\n    }\n    else {\n        node.textContent = name + ' - N/A';\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yYXRlbXljb3JuZWxscHJvZmVzc29yLy4vc3JjL2NvbnRlbnQudHM/MTA1ZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsNENBQTRDO0FBQzVDLGdDQUFnQztBQUVoQyxJQUFNLFFBQVEsR0FBVyxpQ0FBaUMsQ0FBQztBQUMzRCxJQUFNLGVBQWUsR0FBVyxxSUFBcUksQ0FBQztBQUN0SyxJQUFNLEtBQUssR0FBVyxTQUFTLENBQUM7QUFDaEMsSUFBTSxNQUFNLEdBQVcsU0FBUyxDQUFDO0FBQ2pDLElBQU0sR0FBRyxHQUFXLFNBQVMsQ0FBQztBQUM5QixnRkFBZ0Y7QUFDaEYsSUFBTSxpQkFBaUIsR0FBVywwRkFBMEYsQ0FBQztBQUM3SCwyRUFBMkU7QUFDM0UsSUFBTSxrQkFBa0IsR0FBUTtJQUM5QixRQUFRLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDO0NBQ2pELENBQUM7QUFFRixhQUFhO0FBQ2Isc0RBQXNEO0FBRXRELDRHQUE0RztBQUM1RyxJQUFNLHdCQUF3QixHQUFxQixJQUFJLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hDLElBQUksa0JBQWtCLElBQUksU0FBUyxFQUFFO0lBQ2pDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxjQUFJLElBQUksK0JBQXdCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUEzRCxDQUEyRCxDQUFDLENBQUM7Q0FDbkc7QUFFRDs7R0FFRztBQUNILFNBQVMsb0JBQW9CO0lBQTdCLGlCQWtCQztJQWpCQyxJQUFNLGNBQWMsR0FBd0IsaUJBQWlCLEVBQUUsQ0FBQztJQUNoRSw2R0FBNkc7SUFDN0csdURBQXVEO0lBQ3ZELElBQU0scUJBQXFCLEdBQUcsZUFB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UyxnQkFBZ0IsQ0FBQyxJQUFZO0lBQ3BDLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLGtCQUFrQixDQUFDLElBQVk7SUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxlQUFlLENBQUMsSUFBWSxFQUFFLElBQWlCO0lBQ3RELFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxZQUFZLENBQUMsSUFBaUI7SUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztBQUM5RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxJQUFZLEVBQUUsSUFBaUIsRUFBRSxLQUFjO0lBQy9ELElBQUksS0FBSyxFQUFFO1FBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxRQUFRLENBQUM7S0FDcEM7QUFDSCxDQUFDIiwiZmlsZSI6Ii4vc3JjL2NvbnRlbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJhdGUgTXkgQ29ybmVsbCBQcm9mZXNzb3JzXG4gKiBKYXZhU2NyaXB0IGZpbGUgdG8gc2NyYXBlIGluZm9ybWF0aW9uIGFuZCByZXBsYWNlIGl0IGluIENsYXNzIFJvc3RlclxuICovXG5cbi8vaW1wb3J0IHsgcmVzdHJpY3RlZCB9IGZyb20gJy4vcmVzdHJpY3RlZCc7XG4vL2ltcG9ydCB7IHN1YnMgfSBmcm9tICcuL3N1YnMnO1xuXG5jb25zdCBCQVNFX1VSTDogc3RyaW5nID0gJ2h0dHA6Ly93d3cucmF0ZW15cHJvZmVzc29ycy5jb20nO1xuY29uc3QgQkFTRV9TRUFSQ0hfVVJMOiBzdHJpbmcgPSAnaHR0cDovL3d3dy5yYXRlbXlwcm9mZXNzb3JzLmNvbS9zZWFyY2guanNwP3F1ZXJ5b3B0aW9uPUhFQURFUiZxdWVyeUJ5PXRlYWNoZXJOYW1lJnNjaG9vbE5hbWU9Q29ybmVsbCtVbml2ZXJzaXR5JnNjaG9vbElEPTI5OCZxdWVyeT0nO1xuY29uc3QgR1JFRU46IHN0cmluZyA9ICcjMUZCODFDJztcbmNvbnN0IFlFTExPVzogc3RyaW5nID0gJyNGRUVCMDAnO1xuY29uc3QgUkVEOiBzdHJpbmcgPSAnI0ZDNDQzMyc7XG4vLyBVc2UgdGhlIHNhbWUgbG9hZGluZyBpbmRpY2F0b3IgdGhhdCB0aGUgcGFnZSBhbHJlYWR5IGRvZXM7IGRvbid0IGhvc3Qgb3VyIG93blxuY29uc3QgTE9BRElOR19JTkRJQ0FUT1I6IHN0cmluZyA9ICc8aW1nIHNyYz1cImh0dHBzOi8vaS5waW5pbWcuY29tL29yaWdpbmFscy9hNi84Zi9iNS9hNjhmYjU4YWExYWNlMjZiMDAwOGY1YTVkYmNlYmZkMi5qcGdcIj4nO1xuLy8gVGhlIGRpdnMgdGhhdCBjb250YWluIHBvc3NpYmxlIGxvY2F0aW9ucyBmb3IgcHJvZmVzc29yIG5hbWVzIHRvIHBvcHVsYXRlXG5jb25zdCAkQ09VUlNFX0xJU1RfQVJFQVM6IGFueSA9IFtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2xhc3MtbGlzdGluZycpLFxuXTtcblxuLy8gQHRzLWlnbm9yZVxuLy8gY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246ICdzaG93SWNvbicgfSk7XG5cbi8vIFdhdGNoIGVhY2ggb2YgdGhlIGFyZWFzIHdoZXJlIHByb2Zlc3NvciBuYW1lcyBtYXkgYXBwZWFyIGZvciBjaGFuZ2VzLiBXaGVuIGRldGVjdGVkLCByYXRlIGVhY2ggcHJvZmVzc29yLlxuY29uc3QgZ2V0T3ZlcmFsbFNjb3Jlc09ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIocmF0ZVByb2Zlc3NvcnNPblBhZ2UpO1xuY29uc29sZS5sb2coJENPVVJTRV9MSVNUX0FSRUFTKTtcbmlmICgkQ09VUlNFX0xJU1RfQVJFQVMgIT0gdW5kZWZpbmVkKSB7XG4gICAgJENPVVJTRV9MSVNUX0FSRUFTLmZvckVhY2goYXJlYSA9PiBnZXRPdmVyYWxsU2NvcmVzT2JzZXJ2ZXIub2JzZXJ2ZShhcmVhLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KSk7XG59XG5cbi8qKlxuICogUmF0ZXMgZWFjaCBvZiB0aGUgcHJvZmVzc29ycyBjdXJyZW50bHkgaW4gdmlldy5cbiAqL1xuZnVuY3Rpb24gcmF0ZVByb2Zlc3NvcnNPblBhZ2UoKSB7XG4gIGNvbnN0IHByb2Zlc3Nvck5vZGVzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gZ2V0UHJvZmVzc29yTm9kZXMoKTtcbiAgLy8gR3JvdXAgbm9kZXMgYnkgcHJvZmVzc29yIG5hbWUuIFRoaXMgd2F5LCBvbmx5IG9uZSBBUEkgY2FsbCBuZWVkcyB0byBiZSBtYWRlIHBlciBwcm9mZXNzb3IsIHRoZW4gdGhhdCBzY29yZVxuICAvLyBpcyBhc3NpZ25lZCB0byBlYWNoIG9mIHRoZSBub2RlcyB3aXRoIHRoYXQgcHJvZmVzc29yXG4gIGNvbnN0IGdyb3VwZWRQcm9mZXNzb3JOb2RlcyA9IGdyb3VwUHJvZmVzc29ycyhwcm9mZXNzb3JOb2Rlcyk7XG4gIE9iamVjdC5rZXlzKGdyb3VwZWRQcm9mZXNzb3JOb2RlcykuZm9yRWFjaChhc3luYyBuYW1lID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKGlzVmFsaWRQcm9mZXNzb3IobmFtZSkgJiYgaXNVbnJhdGVkUHJvZmVzc29yKG5hbWUpKSB7XG4gICAgICAgIGdyb3VwZWRQcm9mZXNzb3JOb2Rlc1tuYW1lXS5mb3JFYWNoKHNldElzTG9hZGluZyk7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gYXdhaXQgZ2V0UHJvZmVzc29ySWQobmFtZSkudGhlbihnZXRPdmVyYWxsU2NvcmUpO1xuICAgICAgICBncm91cGVkUHJvZmVzc29yTm9kZXNbbmFtZV0uZm9yRWFjaChub2RlID0+IHNldFNjb3JlKG5hbWUsIG5vZGUsIHNjb3JlKSk7XG4gICAgICB9IGVsc2UgaWYgKGlzVW5yYXRlZFByb2Zlc3NvcihuYW1lKSkge1xuICAgICAgICBncm91cGVkUHJvZmVzc29yTm9kZXNbbmFtZV0uZm9yRWFjaChub2RlID0+IHNldEludmFsaWRTY29yZShuYW1lLCBub2RlKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBncm91cGVkUHJvZmVzc29yTm9kZXNbbmFtZV0uZm9yRWFjaChub2RlID0+IHNldEludmFsaWRTY29yZShuYW1lLCBub2RlKSk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIG5vZGVzIG9mIGVhY2ggc2VhcmNoIHJlc3VsdCdzIHByb2Zlc3NvciBmaWVsZFxuICovXG5mdW5jdGlvbiBnZXRQcm9mZXNzb3JOb2RlcygpOiBOb2RlTGlzdE9mPEVsZW1lbnQ+IHtcbiAgbGV0IHJldHVyblZhbDogYW55XG4gIHJldHVyblZhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b29sdGlwLWl3cycpWzBdXG4gIGlmIChyZXR1cm5WYWwgIT0gbnVsbCkge1xuICAgIHJldHVyblZhbCA9IHJldHVyblZhbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcpO1xuICB9XG4gIHJldHVybiByZXR1cm5WYWw7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgcGFydCBvZiB0aGUgVVJMIHRoYXQgbmVlZHMgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIGJhc2UgVVJMIHRvIHJlYWNoIHRoZSBwcm9mZXNzb3IncyBwYWdlXG4gKiBFeGFtcGxlIHJldHVybjogJy9TaG93UmF0aW5ncy5qc3A/dGlkPTIzMDEwMjUnXG4gKi9cbmZ1bmN0aW9uIGdldFByb2Zlc3NvcklkKHByb2ZOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgYWN0aW9uOiAnc2VhcmNoRm9yUHJvZmVzc29yJyxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6IEJBU0VfU0VBUkNIX1VSTCArIGNvbnZlcnROYW1lKHByb2ZOYW1lKVxuICB9O1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKGNvbmZpZywgcmVzID0+IHtcbiAgICAgIGlmIChyZXMucHJvZklkKSB7XG4gICAgICAgIHJlc29sdmUocmVzLnByb2ZJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoJ1NlYXJjaCByZXN1bHQgbm90IGZvdW5kJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFNjcmFwZXMgdGhlIFJNUCBwYWdlIGZvciB0aGUgcHJvZmVzc29yIGF0IDxwcm9mSWQ+IGZvciB0aGVpciBvdmVyYWxsIHNjb3JlIGFuZCByZXR1cm5zIGl0XG4gKi9cbmZ1bmN0aW9uIGdldE92ZXJhbGxTY29yZShwcm9mSWQ6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPiB7XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBhY3Rpb246ICdnZXRPdmVyYWxsU2NvcmUnLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogQkFTRV9VUkwgKyBwcm9mSWQsXG4gIH07XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoY29uZmlnLCByZXMgPT4ge1xuICAgICAgaWYgKHJlcy5wcm9mUmF0aW5nKSB7XG4gICAgICAgIGlmIChyZXMucHJvZlJhdGluZyA9PT0gJzAuMCcgfHwgcmVzLnByb2ZSYXRpbmcuaW5jbHVkZXMoJ0dyYWRlIHJlY2VpdmVkJykpIHtcbiAgICAgICAgICByZWplY3QoJ1Byb2Zlc3NvciBub3QgcmF0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHBhcnNlRmxvYXQocmVzLnByb2ZSYXRpbmcpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdObyByYXRpbmcgZm91bmQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBuYW1lIGZyb20gaXQncyBub3RhdGlvbiBhcyBzaG93biBpbiB0aGUgc2VhcmNoIHJlc3VsdHMgdG8gYSBmb3JtXG4gKiB0aGF0IGNhbiBiZSBhcHBlbmRlZCB0byB0aGUgYmFzZSBSYXRlTXlQcm9mZXNzb3JzIFVSTCBpbiBvcmRlciB0byBlbXVsYXRlXG4gKiBhIHNlYXJjaC5cbiAqL1xuZnVuY3Rpb24gY29udmVydE5hbWUob3JpZ2luYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJlZ2V4ID0gL1xcdysoLCApXFx3Ky9nO1xuICBjb25zdCB0ZW1wOiBSZWdFeHBFeGVjQXJyYXkgPSByZWdleC5leGVjKG9yaWdpbmFsKSE7XG4vLyAgIGlmICh0ZW1wWzBdLnRyaW0oKSBpbiBzdWJzKSB7XG4vLyAgICAgdGVtcFswXSA9IHN1YnNbdGVtcFswXS50cmltKCldO1xuLy8gICB9XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodGVtcFswXSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNvbG9yIGJhc2VkIG9uIDxyYXRpbmc+LiBUaGVzZSBudW1iZXJzIG1hdGNoIHRoZSB2YWx1ZXMgb24gUmF0ZU15UHJvZmVzc29ycy5jb21cbiAqL1xuZnVuY3Rpb24gZ2V0Q29sb3IocmF0aW5nOiBudW1iZXIpOiBzdHJpbmcge1xuICBpZiAocmF0aW5nID49IDMuNSkge1xuICAgIHJldHVybiBHUkVFTjtcbiAgfVxuICBpZiAocmF0aW5nIDwgMi41KSB7XG4gICAgcmV0dXJuIFJFRDtcbiAgfVxuICByZXR1cm4gWUVMTE9XO1xufVxuXG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIGVsZW1lbnRzLCBncm91cHMgdGhlbSBieSBwcm9mZXNzb3IgbmFtZSBhbmQgcmV0dXJucyBhbiBvYmplY3RcbiAqIHdoZXJlIHRoZSBrZXkgcmVwcmVzZW50cyB0aGUgcHJvZmVzc29yIG5hbWUgYW5kIHRoZSB2YWx1ZSBpcyBhbiBhcnJheSBvZiB0aGUgbm9kZXNcbiAqIHRoYXQgY29ycmVzcG9uZCB0byB0aGF0IHByb2Zlc3Nvci5cbiAqXG4gKiBTbGlnaHQgbW9kaWZpY2F0aW9uIG9mIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0NDQ2NTExL3doYXQtaXMtdGhlLW1vc3QtZWZmaWNpZW50LW1ldGhvZC10by1ncm91cGJ5LW9uLWEtamF2YXNjcmlwdC1hcnJheS1vZi1vYmplY3RzXG4gKi9cbmZ1bmN0aW9uIGdyb3VwUHJvZmVzc29ycyh2YWxzOiBOb2RlTGlzdE9mPEVsZW1lbnQ+KTogeyBba2V5OiBzdHJpbmddOiBIVE1MRWxlbWVudFtdIH0ge1xuICByZXR1cm4gQXJyYXkuZnJvbSh2YWxzKS5yZWR1Y2UoKHJldCwgdmFsKSA9PiB7XG4gICAgKHJldFt2YWwudGV4dENvbnRlbnQudHJpbSgpXSA9IHJldFt2YWwudGV4dENvbnRlbnQudHJpbSgpXSB8fCBbXSkucHVzaCh2YWwpO1xuICAgIHJldHVybiByZXQ7XG4gIH0sIHt9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIFRSVUUgaWYgdGhlIHByb2Zlc3NvciBpcyBhIHNpbmdsZSwgbm9uLVN0YWZmIHByb2Zlc3Nvci4gU3RhZmYgcHJvZmVzc29ycyBhbmRcbiAqIGNvdXJzZXMgd2l0aCBtdWx0aXBsZSBwcm9mZXNzb3JzIHJldHVybiBGQUxTRS5cbiAqL1xuZnVuY3Rpb24gaXNWYWxpZFByb2Zlc3NvcihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIChuYW1lICE9PSAnJyAmJiAhbmFtZS5pbmNsdWRlcygnU3RhZmYnKSk7XG59XG5cbi8qKlxuICogUmV0dXJuIFRSVUUgaWYgdGhlIHByb2Zlc3NvciBpcyBub3QgYWxyZWFkeSByYXRlZCBvciBpcyBpbiB0aGUgcHJvY2VzcyBvZiBiZWluZyByYXRlZC5cbiAqIEZBTFNFIG90aGVyd2lzZS5cbiAqL1xuZnVuY3Rpb24gaXNVbnJhdGVkUHJvZmVzc29yKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gIW5hbWUuaW5jbHVkZXMoJyAtICcpO1xufVxuXG4vKipcbiAqIEFkZHMgJ04vQScgYXMgdGhlIHNjb3JlIHRvIHByb2Zlc3NvciBvbiB0aGUgc2VhcmNoIHBhZ2VcbiAqL1xuZnVuY3Rpb24gc2V0SW52YWxpZFNjb3JlKG5hbWU6IHN0cmluZywgbm9kZTogSFRNTEVsZW1lbnQpIHtcbiAgc2V0U2NvcmUobmFtZSwgbm9kZSk7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgbG9hZGluZyBpbmRpY2F0b3IgbmV4dCB0byBwcm9mZXNzb3IgbmFtZXMgaW4gdGhlIHJlc3VsdHMgbGlzdFxuICovXG5mdW5jdGlvbiBzZXRJc0xvYWRpbmcobm9kZTogSFRNTEVsZW1lbnQpIHtcbiAgbm9kZS5pbm5lckhUTUwgPSBub2RlLmlubmVySFRNTCArICcgLSAnICsgTE9BRElOR19JTkRJQ0FUT1I7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgc2NvcmUgYW5kIGNoYW5nZXMgdGhlIGNvbG9yIG9mIHRoZSBwcm9mZXNzb3Igb24gdGhlIHNlYXJjaCBwYWdlXG4gKi9cbmZ1bmN0aW9uIHNldFNjb3JlKG5hbWU6IHN0cmluZywgbm9kZTogSFRNTEVsZW1lbnQsIHNjb3JlPzogbnVtYmVyKSB7XG4gIGlmIChzY29yZSkge1xuICAgIG5vZGUudGV4dENvbnRlbnQgPSBuYW1lICsgJyAtICcgKyBzY29yZS50b0ZpeGVkKDEpO1xuICAgIG5vZGUuc3R5bGUuY29sb3IgPSBnZXRDb2xvcihzY29yZSk7XG4gIH0gZWxzZSB7XG4gICAgbm9kZS50ZXh0Q29udGVudCA9IG5hbWUgKyAnIC0gTi9BJztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/content.ts\n");
=======

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

>>>>>>> 2035f829427004f997454c603f18589742ad226e

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