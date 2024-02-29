function parkingSystem(cars) {
    let parking = {};

    for (let car of cars) {
        let [direction, number] = car.split(', ');

        if (direction === 'IN') {
            parking[number] = true;
        } else {
            parking[number] = false
        }
    }

    let insideCars = Array.from(Object.keys(parking)).filter(x => parking[x] === true);

    if (insideCars.length === 0) {
        console.log('Parking Lot is Empty');
    } else {
        insideCars.sort((a,b) => a.localeCompare(b)).forEach(x => console.log(x));
    }

    function sortNumberAscending(a, b) {
        return Number(a.slice(2, 6)) - Number(b.slice(2, 6));
    }

}

parkingSystem(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'OUT, CA1234TA']

)