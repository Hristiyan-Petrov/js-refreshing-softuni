class Storage {
    constructor (capacity) {
        this.capacity = capacity;
        this.storage = [];
        this.totalCost = 0;
    }

    addProduct(product) {
        this.capacity -= product.quantity;
        this.storage.push(product);

        // Increase total cost with every new product
        this.totalCost = this.storage.reduce((acc, product) => acc + (product.price * product.quantity), 0);

        // let sum = 0;
        // for (let product of this.storage) {
        //     sum += product.price * product.quantity;
        // }
        // this.totalCost = sum;
    }

    getProducts() {
        // let result = [];

        // this.storage.forEach(product => {
        //     result.push(JSON.stringify(product));    
        // });

        // return result.join('\n');

        return this.storage.map(product => JSON.stringify(product)).join('\n');
    }

    // This is getter. Another way of solving. If this is in use, 13th and 5th lines should be turned off
    // get totalCost() {
    //     return this.storage.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    // }
}

let productOne = {name: 'Cucamber', price: 1.50, quantity: 15};
let productTwo = {name: 'Tomato', price: 0.90, quantity: 25};
let productThree = {name: 'Bread', price: 1.10, quantity: 8};
let storage = new Storage(50);
storage.addProduct(productOne);
storage.addProduct(productTwo);
storage.addProduct(productThree);
console.log(storage.getProducts());
console.log(storage.capacity);
console.log(storage.totalCost);
