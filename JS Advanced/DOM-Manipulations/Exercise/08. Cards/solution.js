function solve() {
   let cardPairs = [];
   let sectionElement = document.querySelector('.cards');
   let player1Span = sectionElement.querySelectorAll('#result span')[0];
   let player2Span = sectionElement.querySelectorAll('#result span')[2];
   let historyDivElement = document.getElementById('history');

   sectionElement.addEventListener('click', revealCard);

   function revealCard(e) {
      // Event (object) delegation - addEventListener to the parent and check if is card (img) 
      if (e.target.tagName !== 'IMG') {
         return;
      }

      // the current background card must be changed with the "whiteCard.jpg" picture 
      e.target.setAttribute('src', 'images/whiteCard.jpg');

      // card name should be appended to one of the span elements in the div with id="result". 
      let currentSpanElement = e.target.parentElement.id === 'player1Div' ? currentSpanElement = player1Span : currentSpanElement = player2Span;
      currentSpanElement.textContent = e.target.name;

      // When cards from both sides are selected, check which one is greater
      if (player1Span.textContent !== '' && player2Span.textContent !== '') {
         compareCards(player1Span, player2Span);

         // update history with the desired format
         historyDivElement.textContent = cardPairs.map(pair => `[${pair.join(' vs ')}]`).join(' ');
      }
   }

   function compareCards(p1, p2) {
      cardPairs.push([p1.textContent, p2.textContent]);

      // determine which player has the greater card
      let [greaterSpanElement, smallerSpanElement] = Number(p1.textContent) > Number(p2.textContent) ? [p1, p2] : [p2, p1];
      // if (Number(p1.textContent) > Number(p2.textContent)) {
      //    [greaterSpanElement, smallerSpanElement] = [p1, p2];
      // } else {
      //    [greaterSpanElement, smallerSpanElement] = [p2, p1];
      // }

      let greaterPlayerCurrentCardId = `player${greaterSpanElement === player1Span ? '1' : '2'}Div`;
      let smallerPlayerCurrentCardId = `player${smallerSpanElement === player1Span ? '2' : '1'}Div`;
      // if (greaterSpanElement.textContent == sectionElement.querySelectorAll('#result span')[0].textContent) {
      //    greaterPlayerCurrentCardId += '1Div';
      //    smallerPlayerCurrentCardId += '2Div';
      // } else {
      //    greaterPlayerCurrentCardId += '2Div';
      //    smallerPlayerCurrentCardId += '1Div';
      // }

      styleRevealed(greaterPlayerCurrentCardId, smallerPlayerCurrentCardId, greaterSpanElement, smallerSpanElement);
   }

   function styleRevealed(greaterPlayerCurrentCardId, smallerPlayerCurrentCardId, greaterSpanElement, smallerSpanElement) {

      let greaterCard = [...document.getElementById(greaterPlayerCurrentCardId).children].find(card => card.name == greaterSpanElement.textContent);
      let smallerCard = [...document.getElementById(smallerPlayerCurrentCardId).children].find(card => card.name == smallerSpanElement.textContent);

      greaterCard.style.border = '2px solid green';
      smallerCard.style.border = '2px solid red';

      greaterSpanElement.textContent = '';
      smallerSpanElement.textContent = '';
   }
}