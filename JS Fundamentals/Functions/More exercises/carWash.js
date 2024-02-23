function washCar(commands) {
    let result = 0;
    let handle = null;

    for (let command of commands) {
        switch (command) {
            case 'soap':
                handle = result => result += 10
                break;
            case 'water':
                handle = result => result *= 1.2
                break;
            case 'vacuum cleaner':
                handle = result => result *= 1.25
                break;
            case 'mud':
                handle = result => result *= 0.9
                break;
        }

        result = handle(result);
    }

    console.log(`The car is ${result.toFixed(2)}% clean.`);
}

washCar(['soap', 'soap', 'vacuum cleaner', 'mud', 'soap', 'water']);