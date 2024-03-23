function solve() {
  const rightAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let rightAnswersCounter = 0;
  let sections = document.querySelectorAll('#quizzie section');

  // Attach answer events to the buttons
  sections.forEach(section => {
    let answerButtons = section.querySelectorAll('p');
    answerButtons.forEach(button => {
      button.addEventListener('click', selectAnswer);
    });
  });

  function selectAnswer() {
    if (rightAnswers.includes(this.textContent)) {
      rightAnswersCounter++;
    }

    let parentSection = this.closest('section');
    let nextSection = parentSection.nextElementSibling;
    
    if (parentSection.nextElementSibling.tagName === 'SECTION') {
      parentSection.classList.add('hidden');
      nextSection.classList.remove('hidden');
    } else {
      parentSection.classList.add('hidden');

      let resultWrapper = document.querySelector('#results');
      let resultField = resultWrapper.querySelector('h1');
      
      resultWrapper.style.display = 'block';

      resultField.innerHTML = rightAnswersCounter === rightAnswers.length ? 'You are recognized as top JavaScript fan!' : `You have ${rightAnswersCounter} right answers`;
      // if (rightAnswersCounter === rightAnswers.length) {
      //   resultField.innerHTML = 'You are recognized as top JavaScript fan!';
      // } else {
      //   resultField.innerHTML = `You have ${rightAnswersCounter} right answers`
      // }
    }
  }
}
