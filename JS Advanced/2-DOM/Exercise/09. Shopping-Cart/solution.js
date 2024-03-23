function solve() {
   let textOutput = document.querySelector('.shopping-cart textarea');
   let total = 0;
   let productList = {};

   let addButtons = document.querySelectorAll('.product .add-product');
   addButtons.forEach(button => {
      button.addEventListener('click', function addToCart() {
         let productName = this.parentElement.parentElement.querySelector('.product-details .product-title').innerHTML;
         let productPrice = this.parentElement.parentElement.querySelector('.product-line-price').innerHTML;
         let productQuantity = this.parentElement.previousElementSibling.firstElementChild.value;
         total += Number(productPrice) * productQuantity;

         if (!productList[productName]) {
            productList[productName] = productQuantity;
         } else {
            productList[productName] += productQuantity;
         }
         textOutput.innerHTML += `Added #${productQuantity} ${productName} for ${productPrice} to the cart.\n`;
      });
   });

   let checkoutButton = document.querySelector('.shopping-cart .checkout');
   checkoutButton.addEventListener('click', function orderFinalization() {
      textOutput.innerHTML += `You bought `;
      Object.entries(productList).forEach(([product, quantity], i, arr) => {
         if (i === arr.length - 1) {
            textOutput.innerHTML += `${quantity} ${product}`;
         } else {
            textOutput.innerHTML += `${quantity} ${product}, `;
         }
      });
      textOutput.innerHTML += ` for ${total.toFixed(2)}.`;
      this.setAttribute('disabled', 'true');

      addButtons.forEach(button => {
         button.setAttribute('disabled', 'true');
         // button.classList.add('disabled');
      });
   });
}