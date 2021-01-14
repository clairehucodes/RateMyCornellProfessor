/**
 * Rate My Cornell Professors
 * JavaScript file to scrape information and replace it in Class Roster
 */

//import { restricted } from './restricted';
//import { subs } from './subs';

//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const proxyurl = "http://www.datalakevision.com:8080/";
const BASE_URL: string = proxyurl + 'https://www.ratemyprofessors.com';
const BASE_SEARCH_URL: string = 'https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=Cornell+University&schoolID=298&query=';
const GREEN: string = '#1FB81C';
const YELLOW: string = '#F4BC06';
const RED: string = '#FC4433';
//define map that holds prof name and scores
let myMap = new Map<string,any>()

// @ts-ignore
chrome.runtime.sendMessage({ action: 'showIcon' });
let area = document.getElementsByClassName('class-listing')[0]

// Watch each of the areas where professor names may appear for changes. When detected, rate each professor.
const getOverallScoresObserver: MutationObserver = new MutationObserver(rateProfessorsOnPage);
//$COURSE_LIST_AREAS.forEach(area => getOverallScoresObserver.observe(area, { childList: true }));
getOverallScoresObserver.observe(document.getElementsByClassName('class-listing').item(0), { childList: true, attributes: true});

//rateProfessorsOnPage;
/**
 * Rates each of the professors currently in view.
 */
setTimeout(rateProfessorsOnPage, 800);

async function rateProfessorsOnPage() {
  const professorArray: Array<string> = getProfessorStrings();
  console.log(professorArray)
  let numRow: number = 0;
  for (let i: number = 0; i < professorArray.length; i) {
    let myHTMLColl: HTMLCollection = document.getElementsByClassName('instructors').item(numRow).getElementsByClassName('tooltip-iws');
    for (let j: number = 0; j < myHTMLColl.length; j++) {
      console.log("NUM: " + i);
      let myNode: Element = document.getElementsByClassName('instructors').item(numRow).getElementsByClassName('tooltip-iws').item(j);
      let myName: string = professorArray[i]
      i = i+1;
      if (myMap.get(myName) === undefined){
        // @ts-ignore
        await(myDriver(myName, myNode));
      } 
      else {
        // @ts-ignore
        setScore(myName, myNode, myMap.get(myName));
      }
  }
  numRow++;
}
}

async function myDriver(myName: string, myNode: HTMLElement) {
    try {
      if (isValidProfessor(myName) && isUnratedProfessor(myName)) {
        setIsLoading(myNode);
        let score = await getProfessorId(myName).then(getOverallScore);
        console.log(score);
        myMap.set(myName, score);
        setScore(myName, myNode, score);
        console.log('setting score: ' + myName)
      } else if (isUnratedProfessor(myName)) {
        setInvalidScore(myName, myNode);
        myMap.set(myName, "N/A");
      }

    } catch {
      setInvalidScore(myName, myNode);
      myMap.set(myName, "N/A");
    };
  }


/**
 * Returns an array of strings of each search result's professor field
 */
function getProfessorStrings(): Array<string> {
  let returnStrings: Array<string> = []
  let rowNum: number = 0;
  for (let i: number = 0; i < document.getElementsByClassName('instructors').length; i++) {
    let returnValHTML: any = document.getElementsByClassName('instructors').item(rowNum).getElementsByClassName('tooltip-iws').item(0);
    let returnVal: string;
    if (returnValHTML == null) {
      returnVal = "Staff";
      returnStrings[i] = returnVal;
    }
    else {
      let numProfs = document.getElementsByClassName('instructors').item(rowNum).querySelectorAll('p').length
      let counter: number;
      for (let j: number = 0; j < numProfs; j++) {
        returnVal = document.getElementsByClassName('instructors').item(rowNum).getElementsByClassName('tooltip-iws').item(j).getAttribute('data-content');
        returnVal = returnVal.substring(0, returnVal.indexOf(" ("))
        console.log(i+j);
        counter = i+j;
        returnStrings[i+j] = returnVal;
      }
      i = counter;
    } 
    rowNum++;
  }
  return returnStrings;
}

/**
 * Gets the part of the URL that needs to be appended to the base URL to reach the professor's page
 * Example return: '/ShowRatings.jsp?tid=2301025'
 */
function getProfessorId(profName: string): Promise<string> {

  const config = {
    action: 'searchForProfessor',
    method: 'POST',
    url: BASE_SEARCH_URL + convertName(profName)
  };

  return new Promise((resolve, reject) => {

    // @ts-ignore
    chrome.runtime.sendMessage(config, res => {
      if (res.profId) {
        resolve(res.profId);
      } else {
        reject('Search result not found');
      }
    });
  });
}

/**
 * Scrapes the RMP page for the professor at <profId> for their overall score and returns it
 */
function getOverallScore(profId: string): Promise<number> {

  const config = {
    action: 'getOverallScore',
    method: 'POST',
    url: BASE_URL + profId,
  };
  return new Promise((resolve, reject) => {
    // @ts-ignore
    chrome.runtime.sendMessage(config, res => {
      if (res) {
        if (res.profRating) {
          if (res.profRating === '0.0' || res.profRating.includes('Grade received')) {
            reject('Professor not rated');
          } else {
            resolve(parseFloat(res.profRating));

          }
        } else {
          reject('No rating found');
        }
      }
      else{
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
function convertName(original: string): string {
  let nameArr = original.split(" ");
  let nameURL = nameArr[0] + "+"+ nameArr[1]

  return nameURL
//   const regex = /\w+( )\w+/g;
//   const temp: RegExpExecArray = regex.exec(original)!;
// //   if (temp[0].trim() in subs) {
// //     temp[0] = subs[temp[0].trim()];
// //   }
// return encodeURIComponent(original);
}

/**
 * Returns a color based on <rating>. These numbers match the values on RateMyProfessors.com
 */
function getColor(rating: number): string {
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
function groupProfessors(vals: NodeListOf<Element>): { [key: string]: HTMLElement[] } {
  return Array.from(vals).reduce((ret, val) => {
    (ret[val.textContent.trim()] = ret[val.textContent.trim()] || []).push(val);
    return ret;
  }, {});
}

/**
 * Returns TRUE if the professor is a single, non-Staff professor. Staff professors and
 * courses with multiple professors return FALSE.
 */
function isValidProfessor(name: string): boolean {
  return (name !== '' && !name.includes('Staff'));
}

/**
 * Return TRUE if the professor is not already rated or is in the process of being rated.
 * FALSE otherwise.
 */
function isUnratedProfessor(name: string): boolean {
  return !name.includes(' - ');
}

/**
 * Adds 'N/A' as the score to professor on the search page
 */
function setInvalidScore(name: string, node: HTMLElement) {
  setScore(name, node);
}

/**
 * Appends the loading indicator next to professor names in the results list
 */
function setIsLoading(name: HTMLElement) {
  name.innerHTML = name.innerHTML + ' - ';
}

/**
 * Adds the score and changes the color of the professor on the search page
 */
function setScore(name: string, node: HTMLElement, score?: number) {
  if (score) {
    node.textContent = name + ' - ' + score.toFixed(1);
    node.style.color = getColor(score);
  } else if (node == null) {
    //do nothing
  } 
  else {
    node.innerHTML = name + ' - N/A';
  }
}

