function solve(input) {

    let catalogue = {};

    for (let line of input) {
        let [product, price] = line.split(' : ');
        catalogue[product] = price;
    }

    let sortedCatalogKeys = Object.keys(catalogue).sort((a, b) => a.localeCompare(b));
    let initial = sortedCatalogKeys[0][0]; // get the first letter of first products
    console.log(initial);

    sortedCatalogKeys.forEach(key => {

        if (initial === key[0]) {
            console.log(`  ${key}: ${catalogue[key]}`);
        } else {
            initial = key[0]; // whenever the next item has new starting letter set it as current inital
            console.log(initial);
            console.log(`  ${key}: ${catalogue[key]}`);
        }
    });

}

solve([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]
)