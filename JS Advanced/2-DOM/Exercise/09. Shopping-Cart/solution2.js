function solve() {
    let textOutput = document.querySelector('.shopping-cart textarea');
    let addButtons = document.querySelectorAll('.product .add-product');
    let checkoutButton = document.querySelector('.shopping-cart .checkout');

    let total = 0;
    let productList = {};
    let logs = [];

    addButtons.forEach(button => {
        button.addEventListener('click', function addToCart() {
            let parent = this.parentElement.parentElement;
            let productName = parent.querySelector('.product-details .product-title').textContent;
            let productPrice = parseFloat(parent.querySelector('.product-line-price').textContent);
            let productQuantityInput = parent.querySelector('.product-quantity-input');
            let productQuantity = parseInt(productQuantityInput.value);

            total += productPrice * productQuantity;

            productList[productName] = (productList[productName] || 0) + productQuantity;

            logs.push(`Added #${productQuantity} ${productName} for ${productPrice.toFixed(2)} to the cart.`);
            textOutput.textContent = logs.join('\n');
            productQuantityInput.value = 0;
        });
    });

    checkoutButton.addEventListener('click', function orderFinalization() {
        let productListText = Object.entries(productList)
            .map(([product, quantity], i, arr) =>
                `${quantity} ${product}${i === arr.length - 1 ? '' : ','}`
            )
            .join(' ');

        logs.push(`You bought ${productListText} for ${total.toFixed(2)}.`);
        textOutput.textContent = logs.join('\n');

        checkoutButton.disabled = true;
        addButtons.forEach(button => button.disabled = true);
    });
}