function galdiatorArena(input) {
    let tier = {};
    let line = input.shift();

    while (line !== 'Ave Cesar') {
        if (line.indexOf('vs') > 0) {
            let [gladiatorA, gladiatorB] = line.split(' vs ');

            // If both gladiators exist in the tier, they duel 
            if (tier[gladiatorA] && tier[gladiatorB]) {

                // If they got at least one technique in common, the gladiator with higher skill points wins and the other is removed from the tier
                // If they don't have techniques in common, the duel isn't happening

                let findCommonSkill = function (gladA, gladB) {
                    let skillsA = Object.keys(tier[gladA]);
                    let skillsB = Object.keys(tier[gladB]);

                    for (let skillA of skillsA) {
                        for (let skillB of skillsB) {
                            if (skillA === skillB) {
                                return skillA;
                            }
                        }
                    }
                    return false;
                }

                let commonSkill = findCommonSkill(gladiatorA, gladiatorB);

                if (commonSkill) {
                    let loser = tier[gladiatorA][commonSkill] < tier[gladiatorB][commonSkill] ? gladiatorA : gladiatorB;
                    delete tier[loser];
                }
            }

        } else {
            // When you receive a gladiator and his technique and skill, add him to the gladiator pool, if he isn't present
            let [gladiator, technique, skill] = line.split(' -> ');

            if (!tier[gladiator]) {
                tier[gladiator] = {
                    [technique]: Number(skill)
                };

                // else add his technique or update his skill, only if the current technique skill is lower than the new value
            } else if (!tier[gladiator][technique] || tier[gladiator][technique] < Number(skill)) {
                tier[gladiator][technique] = Number(skill);
            }

        }

        line = input.shift();
    }

    // Sort to prepare for output.
    let sortedGladiators = Object.entries(tier).sort((a, b) => {
        let totalSkillA = Object.values(a[1]).reduce((a, b) => a + b, 0);
        let totalSkillB = Object.values(b[1]).reduce((a, b) => a + b, 0);

        if (totalSkillA === totalSkillB) {
            return a[0].localeCompare(b[0]);
        }
        return totalSkillB - totalSkillA;
    });

    for (let [gladiator, techniques] of sortedGladiators) {
        let totalSkill = Object.values(techniques).reduce((a, b) => a + b, 0);
        console.log(`${gladiator}: ${totalSkill} skill`);

        let sortedTechniques = Object.entries(techniques).sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0].localeCompare(b[0]);
            }
            return b[1] - a[1];
        });

        for (let [technique, skill] of sortedTechniques) {
            console.log(`- ${technique} <!> ${skill}`);
        }
    }



    // Array.from(Object.keys(tier)).sort(sortTotalSkillDesecending).forEach(gladiator => {
    //     console.log(gladiator);
    // });

    // function sortTotalSkillDesecending (a, b) {
    //     return Object.keys(tier[b]).length - Object.keys(tier[a]).length;
    // }
}




galdiatorArena(
    [
        'Pesho -> Duck -> 400',
        'Julius -> Shield -> 150',
        'Gladius -> Heal -> 200',
        'Gladius -> Support -> 250',
        'Gladius -> Shield -> 250',
        'Peter vs Gladius',
        'Gladius vs Julius',
        'Gladius vs Maximilian',
        'Ave Cesar'
        ]
        
)