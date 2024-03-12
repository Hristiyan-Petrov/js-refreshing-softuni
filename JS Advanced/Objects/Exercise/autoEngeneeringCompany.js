function createData(input) {
    let cars = [];

    input.forEach(carData => {
        let [brand, model, quantity] = carData.split(' | ');

        if (!cars.hasOwnProperty(brand)) {
            cars[brand] = {
                [model]: Number(quantity)
            };

        } else {
            if (!cars[brand].hasOwnProperty(model)) {
                cars[brand][model] = Number(quantity);
            } else {
                cars[brand][model] += Number(quantity);
            }
        }
    });

    Object.entries(cars).forEach(([brand, modelsData]) => {
        console.log(brand);

        Object.entries(modelsData).forEach(([model, quantity]) => {
            console.log(`###${model} -> ${quantity}`);
        })
    })
}

createData(
    [
        'Audi | Q8 | 1000',
        'Audi | RS6 | 100',
        'BMW | X5M | 1000',
        'BMW | XM | 100',
        'Citroen | C4 | 123',
        'Volga | GAZ-24 | 1000000',
        'Lada | Niva | 1000000',
        'Lada | Jigula | 1000000',
        'Citroen | C4 | 22',
        'Citroen | C5 | 10',
    'Audi | Q8 | 1000'
    ]
)