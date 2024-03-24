function solve(inputCar) {
    const storage = {
        engines: {
            'small': { power: 90, volume: 1800 },
            'normal': { power: 120, volume: 2400 },
            'monster': { power: 200, volume: 3500 }
        },
        carriages: {
            'hatchback': { type: 'hatchback', color: 'any' },
            'coupe': { type: 'coupe', color: 'any' }
        },
        wheels: [null, null, null, null]
    };


    let finalProduct = {};

    for (let key in inputCar) {
        switch (key) {
            case 'model':
                Object.assign(finalProduct, { [key]: inputCar[key] });
                break;

            case 'power':
                for (let engine in storage.engines) {
                    if (inputCar[key] <= storage.engines[engine].power) {
                        Object.assign(finalProduct, { 'engine': storage.engines[engine] });
                        break;
                    }
                }
                break;

            case 'color':
                finalProduct.color = inputCar[key];
                break;

            case 'carriage':
                Object.assign(finalProduct, { [key]: storage.carriages[inputCar[key]] });
                finalProduct.carriage.color =  finalProduct.color;
                delete finalProduct.color;
                break;

            case 'wheelsize':
                let size = inputCar[key] % 2 === 0 ? inputCar[key] - 1 : inputCar[key];
                Object.assign(finalProduct, {'wheels': storage.wheels.fill(size)});
                break;
        }
    }


    // return finalProduct;
    console.log(finalProduct);
}

solve(
    {
        model: 'VW Golf II',
        power: 90,
        color: 'blue',
        carriage: 'hatchback',
        wheelsize: 14
    }

)

