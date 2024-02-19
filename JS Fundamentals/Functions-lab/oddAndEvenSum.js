function solve(number) {
    // console.log(String(number).split(''));

    let printSums = function (sum1, sum2) {
        return [printEvenSum(sum1),  printOddSum(sum2)];

        // return printOddSum(sum2);
    }

    // function addSumEvens(n) {
    //     sumEvens += n;
    // }

    // function addSumOdds(n) {
    //     sumOdds += n;
    // }

    let printEvenSum = (sum) => {
        return ('Evens sum -> ' + sum);
    }

    let printOddSum = function (sum) {
        return ('Odds sum -> ' + sum);
    }

    let sumEvens = 0, sumOdds = 0;

    let operation = null;

    for (let element of String(number).split('')) {

        if (Number(element) % 2 === 0) {
            operation = a => {
                sumEvens += a;
            }

            // addSumEvens(Number(element));
        } else {
            operation = a => {
                sumOdds += a;
            }

            // addSumOdds(Number(element));
        }

        operation(Number(element));
    }

    console.log(printSums(sumEvens, sumOdds).join(' // ')); 
}



solve(1000435);