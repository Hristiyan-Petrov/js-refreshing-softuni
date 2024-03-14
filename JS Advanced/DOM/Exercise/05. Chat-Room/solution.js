function solve() {
   let inputElement = document.getElementById('chat_input');
   let buttonElement = document.getElementById('send');
   buttonElement.addEventListener('click', function() {

      if (inputElement.value !== '') {
         let messageElement = document.createElement('div');
         messageElement.classList.add('my-message');
         messageElement.classList.add('message');
         messageElement.innerHTML = inputElement.value;

         let chatWrapper = document.querySelector('#chat_messages');
         chatWrapper.appendChild(messageElement); 

         inputElement.valuea = '';
      }
   });
}