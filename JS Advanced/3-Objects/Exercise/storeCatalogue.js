function createCatalogue(data) {
    let catalogue = [];
    let productGroup = '';

    data
        .sort((a, b) => a.localeCompare(b))
        .forEach(dataLine => {
            let [product, price] = dataLine.split(' : ');


            if (productGroup !== product[0]) {
                productGroup = product[0];
                console.log(productGroup);
            }

            console.log(` ${product}: ${price}`);


            // catalogue.push({
            //     [product]: Number(price)
            // });
        });

    // console.log(JSON.stringify(catalogue));
}

createCatalogue(
    ['Appricot : 20.4',
        'Fridge : 1500',
        'TV : 1499',
        'Deodorant : 10',
        'Boiler : 300',
        'Apple : 1.25',
        'Anti-Bug Spray : 15',
        'T-Shirt : 10']

)