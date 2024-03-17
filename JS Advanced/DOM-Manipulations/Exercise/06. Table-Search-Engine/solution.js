function solve() {
   let inputText = document.querySelector('#searchField');
   inputText.addEventListener('keypress', search);
   let searchButtonElement = document.querySelector('#searchBtn');
   searchButtonElement.addEventListener('click', search);

   function search(e) {
      if (e.key && e.key !== 'Enter') {
         return;
      }

      let tableBodyElementChildren = document.querySelector('.container tbody').children;
      let previouselected = Array.from(tableBodyElementChildren).filter(tableRow => tableRow.classList.contains('select'));

      if (previouselected.length > 0) {
         previouselected.forEach(tableRow => {
            // console.log(tableRow);
            tableRow.classList.remove('select')
         });
         previouselected.length = [];
      }

      Array.from(tableBodyElementChildren).forEach(tableRow => {
         Array.from(tableRow.children).forEach(cell => {
            if ((cell.textContent).toLowerCase().includes((inputText.value).toLowerCase())) {
               tableRow.classList.add('select');
            }
         });
      });

      inputText.value = '';
   }
}