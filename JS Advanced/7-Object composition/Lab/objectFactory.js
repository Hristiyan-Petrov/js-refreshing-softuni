function solve(input) {
    // let objects = JSON.parse(input);

    return JSON.parse(input).reduce((acc, currObj) => {
        // return { ...acc, ...currObj };
        return Object.assign({}, acc, currObj);
    }, {});

}

let composer = solve;
let actual = composer(`[{"prop1": 1},{"prop2":2},{"prop3":3}]`);
console.log(actual);

// solve(`[{"prop1": 1},{"prop2":2},{"prop3":3}]`);