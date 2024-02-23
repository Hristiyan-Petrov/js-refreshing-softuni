function adjustCrystalThickness(input) {
    const desiredThickness = input.shift();
    let operation = null;

    for (let i = 0; i < input.length; i++) {

        let currOreThickness = input[i];
        console.log(`Processing chunk ${currOreThickness} microns`);

        // Cut
        let cuts = 0;
        operation = currOreThickness / 4;
        while (operation >= desiredThickness) {
            [currOreThickness, cuts] = operate(operation, cuts);
            operation = currOreThickness / 4;
        }

        if (cuts > 0) {
            console.log(`Cut x${cuts}`);
            currOreThickness = transportation(currOreThickness);
        }

        // Lap
        let laps = 0;
        operation = currOreThickness * 0.8;
        while (operation >= desiredThickness) {
            [currOreThickness, laps] = operate(operation, laps);
            operation = currOreThickness * 0.8;
        }

        if (laps > 0) {
            console.log(`Lap x${laps}`);
            currOreThickness = transportation(currOreThickness);
        }

        // Grind
        let grinds = 0;
        operation = currOreThickness - 20;
        while (operation >= desiredThickness) {
            [currOreThickness, grinds] = operate(operation, grinds);
            operation = currOreThickness - 20;
        }

        if (grinds > 0) {
            console.log(`Grind x${grinds}`);
            currOreThickness = transportation(currOreThickness);
        }

        // Etch 
        let etches = 0;
        operation = currOreThickness - 2;
        while (operation >= desiredThickness - 1) {
            [currOreThickness, etches] = operate(operation, etches);
            operation = currOreThickness - 2;
        }

        if (etches > 0) {
            console.log(`Etch x${etches}`);
            currOreThickness = transportation(currOreThickness);
        }


        // X-ray – increases the thickness of the crystal by 1 micron; this operation can only be done once!

        let xRay = 0;
        operation = currOreThickness + 1;
        if (operation === desiredThickness) {
            currOreThickness = operate(operation, etches).shift();
            xRay++
        }

        if (xRay > 0) {
            console.log(`X-ray x${xRay}`);
        }

        console.log(`Finished crystal ${currOreThickness} microns`);
    }

    function operate(operation, n) {
        return [operation, n += 1];
    }

    function logTransport() {
        console.log('Transporting and washing');
    }

    function transportAndWash(currOreThickness) {
        return Math.floor(currOreThickness);
    }

    function transportation(currOreThickness) {
        logTransport();
        return transportAndWash(currOreThickness);
    }
}

adjustCrystalThickness([1000,
    4000,
    8100]);