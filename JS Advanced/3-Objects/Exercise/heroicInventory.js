function solve(input) {
    let heroes = [];
    input.forEach(lineData => {
        let [name, level, items] = lineData.split(' / ');

        let hero = {
            name,
            level:  Number(level),
            items: items.split(', ')
        }

        heroes.push(hero);
    }); 

    console.log(JSON.stringify(heroes));

}

solve(
    ['Isacc / 25 / Apple, GravityGun',
        'Derek / 12 / BarrelVest, DestructionSword',
        'Hes / 1 / Desolator, Sentinel, Antara']

)