function solve(input) {
    let result = [];

    input.forEach(line => {
        let [town, product, price] = line.split(' | ');
        let existProduct = result.find(x => x.product === product);

        if (!existProduct) {
            result.push({
                product: product,
                town,
                price: Number(price)
            });
        } else if (existProduct) {
            let existProduct = result.find(x => x.product === product);

            // If two towns share the same lowest price, print the one that was entered first. - that means append the new town only if its price is lower, not equar or lower
            let isLowerPrice = existProduct.price > Number(price);

            // let isNewTown = result.find(x => x.town !== town);

            if (isLowerPrice) {
                existProduct.town = town;
                existProduct.price = Number(price);
            }
        }
    });

    // console.log(result);

    result.forEach(({ product, town, price }) => {
        console.log(`${product} -> ${price} (${town})`);
    })
}

solve(['Sample Town | Sample Product | 1000',
'Sample Town | Orange | 2',
'Sample Town | Peach | 1',
'Sofia | Orange | 3',
'Sofia | Peach | 2',
'New York | Sample Product | 1000.1',
'New York | Burger | 10']

)

