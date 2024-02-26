function solve(input) {

    let flights = input.shift();
    let managedFlights = [];

    for (let flight of flights) {
        let [id, ...destination] = flight.split(' '); // Use rest operator to handle more-than-1-word cities

        // console.log(destination);

        managedFlights.push({
            id,
            destination: destination.join(' ') // Convert more-than-1-word cities into 1 string
        });
    }

    let statuses = input.shift();

    for (let line of statuses) {
        let [id, status] = line.split(' ');

        let fligth = managedFlights.find(flight => flight.id === id);

        if (fligth) {
            fligth.status = status;
        }
    }

    let flightStatus = input.shift()[0];

    if (flightStatus === 'Ready to fly') {
        managedFlights.forEach(fligth => {
            if (!fligth.status) {
                fligth.status = 'Ready to fly';
                console.log(`{ Destination: '${fligth.destination}', Status: '${fligth.status}' }`)
            }
        });
    } else {
        managedFlights.forEach(fligth => {
            if (fligth.status === flightStatus) {
                console.log(`{ Destination: '${fligth.destination}', Status: '${fligth.status}' }`)
            }
        });
    }

}

solve([['WN269 Delaware',
'FL2269 Oregon',
 'WN498 Las Vegas',
 'WN3145 Ohio',
 'WN612 Alabama',
 'WN4010 New York',
 'WN1173 California',
 'DL2120 Texas',
 'KL5744 Illinois',
 'WN678 Pennsylvania'],
 ['DL2120 Cancelled',
 'WN612 Cancelled',
 'WN1173 Cancelled',
 'SK330 Cancelled'],
 ['Ready to fly']
]



)
