function solution() {
    let stockMicroelements = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }

    const meals = {
        apple: { carbohydrate: 1, flavour: 2 },
        lemonade: { carbohydrate: 10, flavour: 20 },
        burger: { carbohydrate: 5, fat: 7, flavour: 3 },
        eggs: { protein: 5, fat: 1, flavour: 1 },
        turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }
    }

    // Approach 1
    // let managementFunc = function (input) {
    //     let [command, data, quantity] = input.split(' ');

    //     switch (command) {
    //         case 'restock':
    //             stockMicroelements[data] += Number(quantity);
    //             return 'Success';

    //         case 'prepare':
    //             let recipe = meals[data];
    //             let errorMessage = false;

    //             //check availability of ingridients
    //             Object.keys(recipe).some((microEl) => {
    //                 if (recipe[microEl] > stockMicroelements[microEl]) {
    //                     errorMessage = `Error: not enough ${microEl} in stock`;
    //                     return;
    //                     // throw new Error(`Error: not enough ${microEl} in stock`);
    //                 } else {
    //                     stockMicroelements[microEl] -= recipe[microEl] * Number(quantity);
    //                     if (stockMicroelements[microEl] < 0) stockMicroelements[microEl] = 0;
    //                 }
    //             });

    //             if (errorMessage) {
    //                 return errorMessage;
    //             } else {
    //                 return 'Success';
    //             }

    //         case 'report':
    //             return Object.entries(stockMicroelements)
    //                 .map(el => el.join('='))
    //                 .join(' ');
    //     }

    //     // function createReport() {
    //     //     return Object.entries(microelements)
    //     //         .map(el => el.join('='))
    //     //         .join(' ');
    //     // }
    // }

    // return managementFunc;


    // Approach 2 - cleaner and offers more scalbility 
    const commands = {
        restock: (data, quantity) => {
            stockMicroelements[data] += Number(quantity);
            return 'Success';
        },

        prepare: (data, quantity) => {
            let recipe = meals[data];
            let errorMessage = false;

            //check availability of ingridients
            Object.keys(recipe).some((microEl) => {
                if (recipe[microEl] > stockMicroelements[microEl]) {
                    errorMessage = `Error: not enough ${microEl} in stock`;
                    return;
                    // throw new Error(`Error: not enough ${microEl} in stock`);
                } else {
                    stockMicroelements[microEl] -= recipe[microEl] * Number(quantity);
                    if (stockMicroelements[microEl] < 0) stockMicroelements[microEl] = 0;
                }
            });

            if (errorMessage) {
                return errorMessage;
            } else {
                return 'Success';
            }
        },

        report: () => Object.entries(stockMicroelements)
            .map(el => el.join('='))
            .join(' ')
    }

    return (input) => {
        let [command, data, quantity] = input.split(' ');
        return commands[command](data, quantity);
    }
}

// testing
let manager = solution();
console.log(manager("restock flavour 50"))  // Success
console.log(manager("prepare lemonade 4"))  // Error: not enough carbohydrate in stock
console.log(manager('restock carbohydrate 10'))
console.log(manager('restock flavour 10'))
console.log(manager('prepare apple 1'))
console.log(manager('restock fat 10'))
console.log(manager('prepare burger 1'))
console.log(manager('report'))