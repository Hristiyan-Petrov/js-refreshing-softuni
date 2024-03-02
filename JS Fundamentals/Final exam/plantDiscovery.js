function plantDiscovery(input) {

    let plants = {};
    let n = Number(input.shift());

    // Create object with plants
    while (n > 0) {
        let [plantName, rarity] = input.shift().split('<->');
        plants[plantName] = {
            rarity,
            rating: []
        };
        n--;
    }

    // Update plants with commands
    // If any given plant name is invalid, print "error"
    for (let line of input) {

        if (line.includes('Rate')) {
            // add the given rating to the plant (store all ratings)
            let [plant, rating] = line.split(' - ');
            plant = plant.slice(plant.indexOf(' ') + 1); // Trim the command

            if (!plants[plant]) {
                logError();
                continue;
            }

            plants[plant].rating.push(Number(rating));

        } else if (line.includes('Update')) {
            // update the rarity of the plant with the new one
            let [plant, newRarity] = line.split(' - ');
            plant = plant.slice(plant.indexOf(' ') + 1); // Trim the command

            if (!plants[plant]) {
                logError();
                continue;
            }

            plants[plant].rarity = newRarity;

        } else if (line.includes('Reset')) {
            // remove all the ratings of the given plant
            let [command, plant] = line.split(': ');

            if (!plants[plant]) {
                logError();
                continue;
            }

            plants[plant].rating = [];

        } else {
            //  print result
            printOutput();
            break;
        }
    }

    function printOutput() {
        console.log(`Plants for the exhibition:`);
        Object.keys(plants).forEach(key => {
            let averageRating = plants[key].rating.reduce((acc, rating) => acc + rating, 0);
            averageRating ? averageRating = (averageRating / plants[key].rating.length).toFixed(2) : 0.00;

            console.log(`- ${key}; Rarity: ${plants[key].rarity}; Rating: ${averageRating || '0.00'}`);
        })

    }

    function logError() {
        console.log("error");
    }
}

plantDiscovery(
    (["2",
        "Candelabra<->10",
        "Oahu<->10",
        "Rate: Oahu - 7",
        "Rate: Candelabra - 6",
        "Exhibition"])

)