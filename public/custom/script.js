function sendFeedback() {
  const food = document.querySelector('input[name=rating__food]:checked');
  const driver = document.querySelector('input[name=rating__driver]:checked');
  const experience = document.querySelector('input[name=rating__experience]:checked');
  const recommendation= document.querySelector('input[name=rating__recommendation]:checked');

  const feedback = {
    food: checkValues(food),
    driver: checkValues(driver),
    experience: checkValues(experience),
    recommendation: checkValues(recommendation) 
  };


  displayFeedback(JSON.stringify(feedback));
}

function checkValues(el) {
  if (!el) {
    return null;
  } else {
    return el.value;
  }
}

function displayFeedback(msg) {
  const feedbackEl = document.createElement('pre');
  feedbackEl.insertAdjacentHTML('afterbegin', msg);
  document.querySelector('.feedback').append(feedbackEl);
}

document.querySelector('.feedback__submit').addEventListener('click', e => {
  e.preventDefault();
  sendFeedback();
});
