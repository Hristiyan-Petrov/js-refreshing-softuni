function solve(input) {
    let tableElements = input.shift().split('|').filter(x => x !== '').map(x => x.trim());
    
    
    let result = input.reduce((acc, townData) => {
        townData = townData.split('|').filter(x => x !== '').map(x => x.trim());

        let currTown = {};
        for (let i in townData) {
            currTown[tableElements[i]] = townData[i];
        }

        acc.push(currTown);
        return acc;
    }, [])
    
    console.log(JSON.stringify(result));


    // for (let town of input) {
    //     let [townName, latitude, longitude] = town.split('|').filter(x => x !== '').map(x => x.trim());
    //     result.push({
    //         [tableElements[0]]: townName,
    //         [tableElements[1]]:  Number(Number(latitude).toFixed(2)),
    //         [tableElements[2]]: Number(Number(longitude).toFixed(2)) 
    //     })
    // }

}


function solve(input) {
    let tableElements = input.shift().split('|').filter(x => x !== '').map(x => x.trim());

    let result = input.reduce((acc, townData) => {
        let data = townData.split('|').filter(x => x !== '').map(x => x.trim());
        let town = {};

        for(let i = 0; i < tableElements.length; i++) {
            town[tableElements[i]] = i < 2 ? data[i] : Number(Number(data[i]).toFixed(2));
        }

        acc.push(town);

        return acc;
    }, []);

    console.log(JSON.stringify(result));
}

solve(['| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |']
)