function processCrystals(input) {
    const target = input[0];
    
    for (let i = 1; i < input.length; i++) {
        console.log(`Processing chunk ${input[i]} microns`);
        let microns = input[i];
        
        let cuts = 0;
        while (microns / 4 >= target) {
            microns /= 4;
            cuts++;
        }
        if (cuts > 0) {
            console.log(`Cut x${cuts}`);
            console.log('Transporting and washing');
            microns = Math.floor(microns);
        }
        
        let laps = 0;
        while (microns - microns * 0.2 >= target) {
            microns -= microns * 0.2;
            laps++;
        }
        if (laps > 0) {
            console.log(`Lap x${laps}`);
            console.log('Transporting and washing');
            microns = Math.floor(microns);
        }
        
        let grinds = 0;
        while (microns - 20 >= target) {
            microns -= 20;
            grinds++;
        }
        if (grinds > 0) {
            console.log(`Grind x${grinds}`);
            console.log('Transporting and washing');
            microns = Math.floor(microns);
        }

        let etchs = 0;
        while (microns - 2 >= target) {
            microns -= 2;
            etchs++;
        }
        if (etchs > 0) {
            console.log(`Etch x${etchs}`);
            console.log('Transporting and washing');
            microns = Math.floor(microns);
        }

        if (microns < target) {
            console.log('X-ray x1');
            microns++;
        }

        console.log(`Finished crystal ${microns} microns`);
    }
}