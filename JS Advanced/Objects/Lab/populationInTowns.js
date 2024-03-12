function createRegister(input) {
    let register = {};
    input.forEach(element => {
        let [town, population] = element.split(' <-> ');

        if (!register.hasOwnProperty(town)) {
            register[town] = Number(population);
        } else {
            register[town] += Number(population);
        }
    });

    let sorted = Array.from(Object.entries(register))
        .sort((a, b) => a[1] - b[1])
        .forEach(([key, value]) => console.log(`${key} : ${value}`));

    // Object.entries(sorted)
    //     .forEach(([key, value]) => console.log(`${key} : ${value}`))
}

createRegister(['Sofia <-> 1200000',
'Montana <-> 20000',
'New York <-> 1000001',
'Washington <-> 2345000',
'Las Vegas <-> 1000002']
)