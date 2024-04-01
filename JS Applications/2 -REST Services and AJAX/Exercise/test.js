// // let obj = {42: 10, 83: 18, 108: 10, 111: 15, 309: 9};
// const obj = { foo: "bar", baz: 42 };

// Object.keys(obj).forEach(key => {
//     // console.log(`${key} -> ${obj[key]} \n`);
// });

// Object.entries(obj).forEach(el => {
//     // console.log(el);
// });

// console.log(Object.entries(obj));


let res = {
    "phonebook": {
        "1": {
            "person": "Gosho",
            "phone": "+359 0967653"
        },
        "2": {
            "person": "Stamat",
            "phone": "+359 09123467653"
        }
    }
};
console.log(res.phonebook.length);

Object.entries(res.phonebook).forEach(contact => {
    // console.log(contact.person);
});

let data = {
    "businfo": {
        "0000": {
            "buses": {
                "111": 15,
                "108": 10,
                "42": 10,
                "83": 18,
                "309": 9
            },
            "name": "Lyulin bate"
        },
        "1287": {
            "buses": {
                "76": 15,
                "84": 10,
                "204": 10,
                "213": 18,
                "280": 9,
                "306": 31,
                "604": 11
            },
            "name": "Orlov Most sq."
        },
        "1308": {
            "buses": {
                "4": 13,
                "12": 6,
                "18": 7
            },
            "name": "St. Nedelya sq."
        },
        "1327": {
            "buses": {
                "78": 18,
                "85": 20,
                "213": 18,
                "285": 20,
                "305": 18,
                "404": 18,
                "413": 16
            },
            "name": "Central Train Station sq."
        },
        "2334": {
            "buses": {
                "20": 11,
                "22": 4
            },
            "name": "Centralni Hali"
        }
    }
}

Object.keys(data.businfo).forEach(key => {
    Object.keys(data.businfo[key]).forEach(([key, value]) => {
        console.log(key, value);
    });
});