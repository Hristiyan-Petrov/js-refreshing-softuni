let solve = function (a, b, c) {
    let negativeNumbers = 0;
    let res = '';

    a < 0 ? negativeNumbers++ : negativeNumbers;
    b < 0 ? negativeNumbers++ : negativeNumbers; 
    c < 0 ? negativeNumbers++ : negativeNumbers; 

    if (negativeNumbers % 2 === 0)  {
        return res = 'positive'
    } else {
        return res ='negative'
    }
}

console.log(solve(5,12,-15)); 