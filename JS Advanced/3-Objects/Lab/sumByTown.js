function solve(input) {

    let [firstTown, income] = input.splice(0, 2);
    let towns = {
        [firstTown]: Number(income)
    }

    for (let i = 0; i < input.length; i+= 2) {
        let town = input[i];
        let income = Number(input[i + 1]);
        
        if (towns.hasOwnProperty(town)) {
            towns[town] += income;
        } else {
            towns[town] = income;
        }
    }

    console.log(JSON.stringify(towns));
}


solve(['Sofia','20','Varna','3','Sofia','5','Varna','4'])