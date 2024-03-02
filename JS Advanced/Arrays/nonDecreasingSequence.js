function nonDecreasingSequence(input) {
    let biggest = input.shift();
    console.log(biggest);

    // while (input.some(el => el > biggest)) {
    //     biggest = input.find(x => x > biggest);
    //     console.log(biggest);
    //     input.splice(0, input.indexOf(biggest));
    // }

    input.forEach((element, index, array) => {

        if (element > biggest) {
            biggest = element;
            console.log(biggest);
        }
    });
}

nonDecreasingSequence([1,

    3,

    8,

    4,

    10,

    12,

    3,

    2,

    24])