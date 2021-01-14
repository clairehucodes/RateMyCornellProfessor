// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const method: string = request.method ? request.method.toUpperCase() : 'GET';
    const headers: Headers = new Headers();
    if (method === 'POST') {
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      //res.header("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");
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
        console.log('thats so fetch!')
        fetch(request.url, config)
          .then(res => res.text()) 
          .then(pageText => {
            console.log('<<<< fetch happened')
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
        fetch(request.url)
          .then(res => res.text())
          .then(pageText => {
            console.log('"@@@@@@@@@@@@"')
            console.log(pageText)
            const ratingPage: HTMLElement = document.createElement('html');
            ratingPage.innerHTML = pageText;
            const profRatingEle: any = ratingPage.getElementsByClassName('RatingValue__Numerator-qw8sqy-2 liyUjw').item(0)
            console.log('++++++++')
            console.log(profRatingEle)
            //console.log(ratingPage.getElementsByClassName('RatingValue__Numerator'))
            let profRating: HTMLElement;
            if (profRatingEle != null) {
              console.log('^^^^^^^^^^')
              console.log(profRatingEle)
              profRating = profRatingEle.textContent
              sendResponse({ profRating });
            }
            else {
              console.log('%%%%%%%%%%')
              console.debug('[ERROR: ratingPage.querySelector(div.grade) is null]');
              sendResponse();
            }
          })
          .catch(err => {
            console.log('caught!!!!')
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