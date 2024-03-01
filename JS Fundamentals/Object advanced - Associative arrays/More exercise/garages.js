function createGarages(input) {

    let garages = {};

    for (let line of input) {
        [garageNumber, data] = line.split(' - ');

        if (!garages[garageNumber]) {
            garages[Number(garageNumber)] = [];
        }

        data = data.split(', ');
        let car = {};

        for (let carData of data) {
            let [key, value] = carData.split(': ');
            car[key] = value;
        }

        garages[garageNumber].push(car);
    }

    Object.keys(garages).sort((a, b) => a - b).forEach(key => {
        console.log(`Garage № ${key}`);

        // Optimized variant of the following it code
        // garages[key].forEach(car => {
        //     let formattedCarData = Object.entries(car).map(([key, value]) => `${key} - ${value}`).join(', ');
        //     console.log(`--- ${formattedCarData}`);
        // });

        for (let car of garages[key]) {
            let carEntries = Object.entries(car);
            let formatLine = [];

            for (let entry of carEntries) {
                formatLine.push(entry.join(' - '));
            }

            console.log(`--- ${formatLine.join(', ')}`);
        }
    });
}

createGarages(
    [
        '4 - color: dark blue, fuel type: diesel, manufacture: Fiat',
        '1 - color: blue, fuel type: diesel',
        '1 - color: red, manufacture: Audi',
        '2 - fuel type: petrol',

    ]
);