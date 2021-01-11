// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const method: string = request.method ? request.method.toUpperCase() : 'GET';
    const headers: Headers = new Headers();
    if (method === 'POST') {
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Origin', '*');

    }
    const config: RequestInit = {
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
          .then(res => res.text())
          .then(pageText => {
            const searchPage: HTMLElement = document.createElement('html');
            searchPage.innerHTML = pageText;
            // const profId: HTMLElement = searchPage.querySelector('.listing.PROFESSOR');
            const profId: any = searchPage.querySelector('.listing.PROFESSOR');
            const ret = (profId) ?
              profId.getElementsByTagName('a')[0].getAttribute('href') :
              profId;
            console.debug(ret);
            sendResponse({ profId: ret });
          })
          .catch(err => {
            console.debug('[ERROR: searchForProfessor]');
            console.debug(err);
            sendResponse();
            return false;
          });
        return true;

      case 'getOverallScore':
        console.log("here!")
        fetch(request.url, config)
          .then(res => res.text())
          .then(pageText => {
            const ratingPage: HTMLElement = document.createElement('html');
            ratingPage.innerHTML = pageText;
            const profRatingEle: any = ratingPage.getElementsByClassName('RatingValue__Numerator');
            console.log(profRatingEle)

            let profRating: HTMLElement;
            if (profRatingEle != null) {
              profRating = profRatingEle.textContent
              sendResponse({ profRating });
            }
            else {
              console.debug('[ERROR: ratingPage.querySelector(div.grade) is null]');
              sendResponse();
            }
          })
          .catch(err => {
            console.debug('[ERROR: getOverallScore]');
            console.debug(err);
            sendResponse();
            return false;
          })
        return true;
    
      default:
        console.debug(`Action ${request.action} not recognized`);
        break;
    }
  });