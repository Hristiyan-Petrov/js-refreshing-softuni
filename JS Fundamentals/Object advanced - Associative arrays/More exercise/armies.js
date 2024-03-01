function createArmies(input) {
    let armies = {};

    for (let line of input) {
        if (line.includes('arrives')) { // add the leader (no army)
            let leader = setLeaderName(line);
            armies[leader] = {};

        } else if (line.includes(':')) { // add the army with its count to the leader (if he exists)
            let [leader, armyData] = line.split(': ');

            if (armies[leader]) {
                let [army, count] = armyData.split(', ');
                armies[leader][army] = Number(count);
            }

        } else if (line.includes('+')) { // if the army exists somewhere add the count
            let [army, count] = line.split(' + ');
            // let whichArmy = checkArmy(army);

            // if (whichArmy) {
            //     whichArmy[0][army] += Number(count); // NEED [0] ONLY FOR THIS WAY OF USING THE FUNCTION - Check it down -> function checkArmy()
            // }

            for (let leader in armies) {
                if (armies[leader].hasOwnProperty(army)) {
                    armies[leader][army] += Number(count);
                }
            }

        } else if (line.includes('defeat')) { // delete the leader and his army (if he exists)
            let leader = setLeaderName(line);
            if (armies[leader]) {
                delete armies[leader];
            }
        }
    }


    // Sorting and Printing
    // let sortedLeaders = Object.entries(armies)

    Object.entries(armies)
        .sort(([aName, aArmies], [bName, bArmies]) => {
            let aTotal = Object.values(aArmies).reduce((a, b) => a + b, 0);
            let bTotal = Object.values(bArmies).reduce((a, b) => a + b, 0);
            return bTotal - aTotal;
        })
        .forEach(([leader, army]) => {
            let total = Object.values(army).reduce((a, b) => a + b, 0);
            console.log(`${leader}: ${total}`);
            Object.entries(army)
                .sort(([aName, aCount], [bName, bCount]) => bCount - aCount)
                .forEach(([army, count]) => console.log(`>>> ${army} - ${count}`));
        });

    // for (const [leader, army] of sortedLeaders) {
    //     let total = Object.values(army).reduce((a, b) => a + b, 0);
    //     console.log(`${leader}: ${total}`);
    //     Object.entries(army)
    //         .sort(([aName, aCount], [bName, bCount]) => bCount - aCount)
    //         .forEach(([army, count]) => console.log(`>>> ${army} - ${count}`));
    // }

    // Object.keys(armies)
    //     .sort((leaderA, leaderB) => {
    //         if (armies[leaderB].length === armies[leaderA].length) {
    //             return leaderA.localeCompare(leaderB);
    //         }

    //         return armies[leaderB].length - armies[leaderA].length;
    //     })
    //     .forEach(leader => {
    //         let totalSoldiers = getTotalSoldiers(leader);
    //         console.log(`${leader}: ${totalSoldiers}`);

    //         armies[leader]
    //             .sort((armyA, armyB) => {
    //                 return Array.from(Object.values(armyB)) - Array.from(Object.values(armyA));
    //             })
    //             .forEach(army => {
    //                 Object.entries(army).forEach(([army, count]) => {
    //                     console.log(`>>> ${army} - ${count}`);
    //                 })
    //             })
    //     })

    // When finished reading the input sort the leaders by total army count in descending. 
    // Then each army should be sorted by count in descending.



    function setLeaderName(line) {
        line = line.split(' ');
        return line.slice(0, line.length - 1).join(' ');
    }

    function checkArmy(army) {
        // First most optimized way, the most fancy and flexy
        // let allArmies = [].concat(...Object.values(armies));
        // let result = allArmies.find(leaderArmy => leaderArmy.hasOwnProperty(army));
        // return result || null;

        // Other most optimized way, no need for result variable 
        return Object.values(armies).find(leaderArmies => {
            return leaderArmies.find(leaderArmy => leaderArmy.hasOwnProperty(army));
        });

        // Using loops
        // let result = null;

        // Object.keys(armies).forEach((leader) => {

        //     Object.values(armies[leader]).forEach(leaderArmy => {

        //         // Way 1
        // if (leaderArmy.hasOwnProperty(army)) {
        //     result = leaderArmy;
        // }

        //         // // Way 2 - Fancy way of recreting hasOwnProperty() functionality, The in operator checks the properties
        //         if (army in leaderArmy) {
        //             result = leaderArmy;
        //         }

        // Way 3 
        // Object.keys(leaderArmy).forEach(armyName => {
        //     if (armyName === army) {
        //         result = leaderArmy;
        //     }
        // });
        // });
        // });

        // return result;
    }

    function getTotalSoldiers(leader) {
        let result = 0;

        for (let army of armies[leader]) {
            result += Object.values(army)[0];
        }

        return result;
    }

}



createArmies(
    [
        "Rick Burr arrives",
        "Findlay arrives",
        "Rick Burr: Juard, 1500",
        "Wexamp arrives",
        "Findlay: Wexamp, 34540",
        "Wexamp + 340",
        "Wexamp: Britox, 1155",
        "Wexamp: Juard, 43423"
    ]
)