function solve() {
    return {
        extend: function (template) {
            for (let key in template) {
                (typeof template[key] === 'function' ? Object.getPrototypeOf(this) : this)[key] = template[key];
    
                // Analogical conditions
                // if (typeof template[key] === 'function') {
                //     Object.getPrototypeOf(myObj)[key] = template[key];
                // } else {
                //     this[key] = template[key];
                // }
            }
        }
    }
}


var template = {
    extensionMethod: function () {
        return 5;
    }
};

var testObject = solve();
testObject.extend(template);
console.log(testObject.extensionMethod());