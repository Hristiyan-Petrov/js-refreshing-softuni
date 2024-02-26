function heroRegsiter(data) {
    let register = [];

    for (let hero of data) {
        // console.log(hero);
        let [name, level, items] = hero.split(' / ');
        items = items.split(', ');
        // console.log(items);

        let currHeroData = {
            name,
            level: Number(level),
            items
        };

        register.push(currHeroData);
    }

    // console.log(register);

    register.sort((a, b) => a.level - b.level).forEach(hero => {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items.join(', ')}`);

    });
}

heroRegsiter(
    [
        'Isacc / 25 / Apple, GravityGun',
        'Derek / 12 / BarrelVest, DestructionSword',
        'Hes / 1 / Desolator, Sentinel, Antara'
    ]

)