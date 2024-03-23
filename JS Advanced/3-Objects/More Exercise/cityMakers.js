function solve(input) {
    let towns = {};

    input.forEach(productData => {
        let [town, product, ...productPriceAndQuantity] = productData.split(' -> ');
        let amount = productPriceAndQuantity[0].split(' : ').reduce((acc, value) => acc * Number(value), 1);
        // console.log(amount);

        if (!towns[town]) {
            towns[town] = {
                [product]: amount
            }
        } else {
            if (!towns[town][product]) {
                towns[town][product] = amount;
            } else {
                towns[town][product] += amount;
            }
        }
    });


    Object.entries(towns).forEach(([town, data]) => {
        console.log(`Town - ${town}`);
        
        Object.entries(data).forEach(([product, price]) => {
            console.log(`$$$${product} : ${price}`)
        });
    });
}


solve(
    ['Sofia -> Laptops HP -> 200 : 2000',
        'Sofia -> Raspberry -> 200000 : 1500',
        'Sofia -> Audi Q7 -> 200 : 100000',
        'Montana -> Portokals -> 200000 : 1',
        'Montana -> Qgodas -> 20000 : 0.2',
        'Montana -> Chereshas -> 1000 : 0.3']

)