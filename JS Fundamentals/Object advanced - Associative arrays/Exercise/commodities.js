function mineCommodities(input) {
    let commodities = {};

    for (let i = 0; i < input.length; i += 2) {
        let commodity = input[i];
        let quantity = Number(input[i+1]);


        commodities[commodity] = (commodities[commodity] || 0) + quantity;

        // if (!commodities[commodity]) {
        //     commodities[commodity] = quantity;
        // } else {
        //     commodities[commodity] += quantity;
        // }
    }

    Object.keys(commodities).forEach(el => console.log(`${el} -> ${commodities[el]}`));
}

mineCommodities([
    'gold',
    '155',
    'silver',
    '10',
    'copper',
    '17',
    'gold',
    '15'
]
)