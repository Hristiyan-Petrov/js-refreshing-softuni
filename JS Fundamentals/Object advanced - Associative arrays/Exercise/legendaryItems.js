function legendaryFarming(input) {
    const legendaryItems = {
        'shards': 'Shadowmourne',
        'fragments': 'Valanyr',
        'motes': 'Dragonwrath'
    };

    let materials = {
        'shards': 0,
        'fragments': 0,
        'motes': 0
    };

    let junk = {};

    let foundItems = input.split(' ');

    for (let i = 0; i < foundItems.length; i += 2) {
        let quantity = Number(foundItems[i]);
        let currentMaterial = foundItems[i + 1].toLowerCase();

        if (Object.keys(materials).includes(currentMaterial)) {
            materials[currentMaterial] += quantity;

            let foundLegendary = checkForLegendary();
            if (foundLegendary) {
                console.log(`${legendaryItems[foundLegendary]} obtained!`);
                materials[foundLegendary] -= 250;
                break;
            }

        } else {
            junk[currentMaterial] = (junk[currentMaterial] || 0) + quantity;
        }
    }

    // Print the remaining shards, fragments, motes, ordered by quantity in descending order, then by name in ascending order each on a new line

    let sortedMaterialsArray = Object.keys(materials).sort((a, b) => { // will return array of sorted keys 
        if (materials[b] === materials[a]) {
            return a.localeCompare(b);
        } 

        return materials[b] - materials[a];
    });

    for (let key of sortedMaterialsArray) {
        console.log(`${key}: ${materials[key]}`);
    }

    // Finally, print the collected junk items, in alphabetical order

    let sortedJunkKvpArray = Object.entries(junk).sort((a, b) => { // will return array of sorted key value pairs (array of 2-length-arrays) 
       return a[0].localeCompare(b[0]);
    });

    for (let [key, value] of sortedJunkKvpArray) {
        console.log(`${key}: ${value}`);
    }

    function checkForLegendary() {
        let isFound = false;

        Object.keys(materials).forEach(key => {
            if (materials[key] >= 250) {
                isFound = key;
            }
        });
        return isFound;
    }

}

legendaryFarming('123 silver 6 shards 8 shards 5 motes 9 fangs 75 motes 103 MOTES 8 Shards 86 Motes 7 stones 19 silver')