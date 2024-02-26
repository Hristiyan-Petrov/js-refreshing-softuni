function person(a, b, c) {
    let person = {
        firstName: a,
        lastName: b,
        age: c
    }
    
    
    Object.keys(person).forEach(key => {
        console.log(`${key}: ${person[key]}`);
    });

    // for (let key in person) {
    //     console.log(`${key}: ${person[key]}`);
        
    // }
}

person("Peter",
    "Pan",
    "20"
);