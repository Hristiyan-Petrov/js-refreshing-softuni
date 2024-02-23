function checkCityPollution(map, commands) {

    const city = map.map(el => el.split(' ').map(Number));
    const cityLength = 5;
    const pollutionBlockThreshold = 50;

    for (let command of commands) {
        let [force, number] = command.split(' ');
        // console.log(city);

        if (force === 'breeze') {

            for (let i = 0; i < cityLength; i++) {
                city[number][i] -= 15;
            }

        } else if (force === 'gale') {

            for (let i = 0; i < cityLength; i++) {
                city[i][number] -= 20;
            }

        } else if (force === 'smog') {

            for (let i = 0; i < cityLength; i++) {
                for (let j = 0; j < cityLength; j++) {
                    city[i][j] += Number(number);
                }
            }
        }
    }

    let pollutedBlocks = [];
    findPollutedBlocks();

    function findPollutedBlocks() {
        for (let row = 0; row < cityLength; row++) {
            for (let column = 0; column < cityLength; column++) {
                if (city[row][column] >= pollutionBlockThreshold) {
                    pollutedBlocks.push(`[${row}-${column}]`);
                }
            }
        }
        if (pollutedBlocks.length > 0) {
            console.log(`Polluted areas: ${pollutedBlocks.join(', ')}`)
        } else {
            console.log('No polluted areas');
        }
    }
}

checkCityPollution(["5 7 2 14 4",
"21 14 2 5 3",
"3 16 7 42 12",
"2 20 8 39 14",
"7 34 1 10 24"],
["breeze 1", "gale 2", "smog 35"]
);