let orderProducts = function (products) {
    return products
        .sort((a, b) => a.localeCompare(b))
        .map((product, index) => product = `${index + 1}. ` + product)
        .join('\n');
}

let orderedProducts = orderProducts(["Potatoes", "Tomatoes", "Onions", "Apples"]);
console.log(orderedProducts);