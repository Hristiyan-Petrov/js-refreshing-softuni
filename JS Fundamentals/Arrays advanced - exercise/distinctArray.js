function removeRepeatingElements(input) {

    let ascendingOrder = (a, b) => {
        return a - b;
    }

    let result = [];

    // Approach 1 without using built in JS array functions

    // if (!result.length) {
    //     result.push(input[0]);
    //     input.splice(0, 1);
    // }

    // for (let i in input) {
    //     let duplicate = false;

    //     for (el of result) {
    //         if (el === input[i]) {
    //             duplicate = true;
    //             break;
    //         }
    //     }

    //     if (!duplicate) {
    //         result.push(input[i]);
    //     }


    // Approach 2 using .indexOf()

    input.forEach((el) => {
        if (result.indexOf(el) === -1) {
            result.push(el);
        }
    });

    // Approach 3 using .includes()

    // for (el of input) {
    //     if (!result.includes(el)) {
    //         result.push(el);
    //     }
    // }

    return result.sort(ascendingOrder);
}



console.log(removeRepeatingElements([20, 8, 8, 12, 13, 4, 4, 8, 5]));