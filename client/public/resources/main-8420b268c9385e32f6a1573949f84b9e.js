// On Page Load
function getCoords(elId) {
  const element = document.getElementById(elId);
  const position = element.getBoundingClientRect();
  const x = position.left;
  const y = position.top;

  return {x, y};
}

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      scrollTo(element, to, duration - 10);
  }, 10);
}

if (window.location.search) {
  const resultsCoords = getCoords('results-header');
  if (resultsCoords && resultsCoords.y) {
    scrollTo(document.body, resultsCoords.y, 600);
  }
}

// Submit Form
if (document.getElementById('search-form')) {
  document.getElementById('search-form').onsubmit = (e) => {
    e.preventDefault();
    submitTermSearch(e)
  };
}

function submitTermSearch(e) {
  let queryString = '?';
  const formId = e.target.getAttribute('id') ? e.target.getAttribute('id') : null;
  const formEl = formId ? document.getElementById(formId) : null;
  const formInputs = formEl ? formEl.elements : null

  loading();

  for (i=0; i<formInputs.length; i++){
    if (formInputs[i].getAttribute('type') !== 'submit'){
      let key, val;

      key = formInputs[i].getAttribute('id');
      val = formInputs[i].value;

      if (key) {
        queryString += key.replace('-input','') + '=' + val + '&';
      }
    }

    if (queryString.charAt(queryString.length - 1) === '&') {
      queryString = queryString.slice(0,-1);
    }
  }

  window.location.href = 'http://localhost:3000/search' + queryString
}

// Click Prev/Next
if (document.getElementById('prev-btn')) {
  document.getElementById('prev-btn').onclick = (e) => {
    loading();
  };
}
if(document.getElementById('next-btn')){
  document.getElementById('next-btn').onclick = (e) => {
    loading();
  };
}

function loading(){
  scrollTo(document.body, 0, 600);
  const main = document.getElementById('main');
  if (main && main.classList) {
    main.classList.add('loading');
  } else if (main) {
    main.className += ' loading';
  }
}
;
