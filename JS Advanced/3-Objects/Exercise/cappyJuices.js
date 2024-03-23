function solve(input) {
    let pussyJuices = {};
    let squirtBottles = {};
    let squirtBottleQuantity = 1000;

    input.forEach(data => {
        let [juice, quantity] = data.split(' => ');

        if (!pussyJuices[juice]) {
            pussyJuices[juice] = Number(quantity);
        } else {
            pussyJuices[juice] += Number(quantity);
        }

        if (pussyJuices[juice] > squirtBottleQuantity) {
            let bottles = extractPussyJuices(pussyJuices[juice]);

            if (!squirtBottles[juice]) {
                squirtBottles[juice] = bottles
            } else {
                squirtBottles[juice] += bottles
            }

            pussyJuices[juice] -= bottles * squirtBottleQuantity;
        }
    });

    // console.log(JSON.stringify(squirtBottles));

    Object.entries(squirtBottles).forEach(([juice, bottles]) => {
        console.log(`${juice} => ${bottles}`);
    })

    function extractPussyJuices(juice) {
        let counter = 0;
        while (juice > 999) {
            juice -= squirtBottleQuantity;
            counter++;
        }

        return counter;
    }
}

solve(
    ['Orange => 2000',
        'Peach => 1432',
        'Banana => 450',
        'Peach => 600',
        'Strawberry => 549']


)