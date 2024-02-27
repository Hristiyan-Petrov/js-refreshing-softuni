function solve(input) {
    let storage = {};

    for (let line of input) {
        let [item, quantity] = line.split(' ');
        
        // if (!storage.hasOwnProperty(item)) {    // Not proper usecase of hasOwnProperty()
        
        if (!storage[item]) {
            storage[item] = Number(quantity);
        } else {
            storage[item] += Number(quantity);
        }
    }

    Object.keys(storage).forEach(key => {
        console.log(`${key} => ${storage[key]}`);
    })
}

solve(['tomatoes 10',
'coffee 5',
'olives 100',
'coffee 40']
)