function solve(input) {
    let numbers = input.split(' ').map(Number);
    let average = numbers.reduce((acc, n) => acc + n) / numbers.length;

    let greaterNumbers = numbers.filter(n => n > average).sort((a, b) => b - a);

    if (greaterNumbers.length < 1) {
        console.log('No');
        return;
    }

    console.log(greaterNumbers.splice(0, 5).join(' '));
}

solve('-1 -2 -3 -4 -5 -6');