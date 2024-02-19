const priceList = {
    'water': 5,
    'coffee': 1.5,
    'coke': 2,
    'bisquit': 2
}

let totalPrice = function(product, quantity) {
    return priceList[product] * quantity;
}

console.log(totalPrice('coffee', 2));
