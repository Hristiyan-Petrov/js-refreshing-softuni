function argumentsCounter(...args) {
    let counter = {};

    let handleArg = function (arg) {
        countArg(arg);
        console.log(`${typeof arg}: ${arg}`);
    }

    let countArg = function (arg) {
        counter[typeof arg] = (counter[typeof arg] || 0) + 1;
    }

    let counterSort = (a, b) => b[1] - a[1];

    args.forEach(handleArg);

    let printCounterCurrent = ([type, value]) => {
        console.log(`${type} = ${value}`);
    }

    (function printCounter() {
        Array.from(Object.entries(counter)).sort(counterSort).forEach(printCounterCurrent);
    })();
}



argumentsCounter(
    { name: 'bob'}, 3.333, 9.999
)