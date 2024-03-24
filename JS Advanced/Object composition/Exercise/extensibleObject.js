let myObj = {
    __proto__: {},
    extend: function () { null }
}


console.log(Object.getPrototypeOf()); // true

// for (let key in myObj) {
//     console.log(key);
// }