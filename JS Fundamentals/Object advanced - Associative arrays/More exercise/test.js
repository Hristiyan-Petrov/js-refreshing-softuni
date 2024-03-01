// let arr = [["color", "red"], ["fuel type", "diesel"], ["manufacture", "Audi"]];
// let loggingFormat = [];
// for (let el of arr) {
//     loggingFormat.push(el.join(': '));
// }
// console.log(loggingFormat.join(', '));

// let army = {'BARBAROSA': 5000}
// let arr = Array.from(Object.values(army))
// console.log(arr);

let library = {"1":{"genre":"history","books":[]},"2":{"genre":"mystery","books":[]},"3":{"genre":"sci-fi","books":[]}};
for (let shelf in library) {
    console.log(library[shelf]);
}