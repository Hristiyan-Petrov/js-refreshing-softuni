function map(input) {
    let destinations = validLocations(input);

    console.log(`Destinations: ${destinations.join(', ')}`);
    let total = destinations.reduce((acc, dest) => acc + dest.length, 0);
    console.log(`Travel Points: ${total}`);


    function validLocations(input) {
        let pattern = /([=/])[A-Z][A-Za-z]{2,}\1/g;
        let matches = input.match(pattern);
        return matches ? matches.map(location => location.slice(1, -1)) : [];
    }
}

map("=Hawai3=/Cy3prus/=Invalid/invalid==i5valid=/I5valid/=i=");