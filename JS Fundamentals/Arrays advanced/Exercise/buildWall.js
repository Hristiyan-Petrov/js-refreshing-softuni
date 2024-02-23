function buildWall(wallSections) {
    let maxHeight = 30; // maximum height of wall in feet.
    let concreteLayer = 195; // amount of concrete used to add 1 foot of heigth to the wall.
    let layerPrice = 1900;
    let totalConcrete = [];

    let isBuilt = areBuiltSections(wallSections); // Function to check if all wall sections are built.

    // While there are still wall sections that are not built.
    while (isBuilt.includes(false)) {
        let concretePerDay = 0;

        for (index in wallSections) { // Iterate through each wall section.

            if (wallSections[index] < maxHeight) {
                wallSections[index]++;
                concretePerDay += concreteLayer;
            }

            if (wallSections[index] === wallSections[wallSections.length - 1]) {
                totalConcrete.push(concretePerDay);
            }
        }
        isBuilt = areBuiltSections(wallSections);
        wallSections = wallSections.filter(x => x < maxHeight);
    }

    console.log(totalConcrete.join(', '));

    let totalPrice = totalConcrete.reduce((a, b) => a + b) * layerPrice + ' pesos'; // Sum all concrete per day with reduce 
    console.log(totalPrice);


    function areBuiltSections(layers) {
        return layers.map(layer => layer < maxHeight ? false : true);
        // Map through the layers array and check if each layer is less than the maxHeight.
        // If it is, return false (not built), otherwise return true (built).
    }
}

buildWall([21, 25, 28]);