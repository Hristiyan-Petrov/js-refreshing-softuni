let searchManipulations = function (sequence, commands) {

    let { elementsToTake, deleteCount, searchedNumber } = setVariables(commands);

    let counter = sequence
        .splice(0, elementsToTake)
        .slice(deleteCount)
        .filter(x => x === searchedNumber);

    return `Number ${searchedNumber} occurs ${counter.length} times after manipulations following the task :)`;
}

let setVariables = commands => {
    let elementsToTake = commands.shift();
    let deleteCount = commands.shift();
    let searchedNumber = commands.shift();
    return { elementsToTake, deleteCount, searchedNumber };
}

let numCount = searchManipulations([5, 2, 3, 3, 1, 6],
    [5, 2, 3]
)

console.log(numCount);