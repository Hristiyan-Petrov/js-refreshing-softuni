function create(words) {
   let contentDivElement = document.querySelector('#content');
   words.forEach(word => {
      let divSectionElement = document.createElement('div');

      let pElement = document.createElement('p');
      pElement.textContent = word;
      // pElement.style.display = 'none';
      pElement.setAttribute('style', 'display: none');

      divSectionElement.appendChild(pElement);

      divSectionElement.addEventListener('click', function(event) {
         
         setDisplayStyle(this);

         // if (pElement.hasAttribute('style')) {
         //    pElement.removeAttribute('style');
         // } else {
         //    pElement.setAttribute('style', 'display: none');
         // }
      });
      
      contentDivElement.appendChild(divSectionElement);
   });
}

function setDisplayStyle(el) {
   if (el.children[0].hasAttribute('style')) {
      el.children[0].removeAttribute('style');
   } else {
      el.children[0].setAttribute('style', 'display: none');
   }
}

