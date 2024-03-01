function armyLeaders(input) {
    let armies = {};

    input.forEach(line => {z
        if (line.includes('arrives')) {
            let leader = line.split(' ')[0];
            armies[leader] = {};

        } else if (line.includes('defeated')) {
            let leader = line.split(' ')[0];
            delete armies[leader];
            
        } else if (line.includes('+')) {
            let [army, count] = line.split(' + ');
            for (let leader in armies) {
                if (armies[leader].hasOwnProperty(army)) {
                    armies[leader][army] += Number(count);
                }
            }
        } else {
            let [leader, armyData] = line.split(': ');
            let [army, count] = armyData.split(', ');
            if (armies[leader]) {
                armies[leader][army] = Number(count);
            }
        }
    });

    let sortedLeaders = Object.entries(armies)
        .sort(([aName, aArmies], [bName, bArmies]) => {
            let aTotal = Object.values(aArmies).reduce((a, b) => a + b, 0);
            let bTotal = Object.values(bArmies).reduce((a, b) => a + b, 0);
            return bTotal - aTotal;
        });

    for (const [leader, army] of sortedLeaders) {
        let total = Object.values(army).reduce((a, b) => a + b, 0);
        console.log(`${leader}: ${total}`);
        Object.entries(army)
            .sort(([aName, aCount], [bName, bCount]) => bCount - aCount)
            .forEach(([army, count]) => console.log(`>>> ${army} - ${count}`));
    }
}

armyLeaders([
    'Rick Burr arrives',
    'Fergus: Wexamp, 30245',
    'Rick Burr: Juard, 50000',
    'Findlay arrives',
    'Findlay: Britox, 34540',
    'Wexamp + 6000',
    'Juard + 1350',
    'Britox + 4500',
    'Porter arrives',
    'Porter: Legion, 55000',
    'Legion + 302',
    'Rick Burr defeated',
    'Porter: Retix, 3205'
]);