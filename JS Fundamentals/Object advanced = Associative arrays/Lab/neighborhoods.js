function solve(input) {
    let neighbourhoods = {};
    let names = input.shift();

    for (let name of names.split(', ')) {
        neighbourhoods[name] = [];
    }

    for (let line of input) {
        let [hood, neigbour] = line.split(' - ');
        
        if (neighbourhoods[hood]) {
            neighbourhoods[hood].push(neigbour);
        }
    }

    let sortedNeighbourhoods = Array.from(Object.entries(neighbourhoods)).sort(sortByInhabitantsCount);

    function sortByInhabitantsCount(a, b) {
        return b[1].length - a[1].length;
    }

    for (let [hood, people] of sortedNeighbourhoods) {
        console.log(`${hood}: ${people.length}`);
        
        for (let person of people) {
            console.log(`--${person}`);
        }
    }
}

solve(['Abbey Street, Herald Street, Bright Mews',
    'Bright Mews - Garry',
    'Bright Mews - Andrea',
    'Invalid Street - Tommy',
    'Abbey Street - Billy']
)