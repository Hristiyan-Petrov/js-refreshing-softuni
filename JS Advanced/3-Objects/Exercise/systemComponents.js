function solve(input) {
    let systems = {};

    input.forEach(systemData => {
        let [system, component, subcomponent] = systemData.split(' | ');

        if (!systems.hasOwnProperty(system)) {
            systems[system] = {
                [component]: [subcomponent]
            };
        } else {
            if (!systems[system].hasOwnProperty(component)) {
                systems[system][component] = [subcomponent];
            } else {
                systems[system][component].push(subcomponent);
            }
        }
    });

    // The Systems you’ve stored must be ordered by:
    //      amount of components, in descending order, as first criteria,
    //      and by alphabetical order as second criteria. 

    // The Components must be ordered by:
    //     amount of Subcomponents, in descending order.

    // console.log(systems);

    Object.entries(systems)
        .sort(sortSystems)
        .forEach(([system, components]) => {
            console.log(system);

            Object.entries(components)
                .sort((a, b) => b[1].length - a[1].length)
                .forEach(([component, subcomponents]) => {
                    console.log(`|||${component}`);

                    subcomponents.forEach(x => console.log(`||||||${x}`));
                });
        });

    function sortSystems(a, b) {
        return Object.keys(b[1]).length - Object.keys(a[1]).length || a[0].localeCompare(b[0]);
    }
}

solve(
    [
        'SULS | Main Site | Home Page',
        'SULS | Main Site | Login Page',
        'SULS | Main Site | Register Page',
        'SULS | Judge Site | Login Page',
        'SULS | Judge Site | Submittion Page',
        'Lambda | CoreA | A23',
        'SULS | Digital Site | Login Page',
        'Lambda | CoreB | B24',
        'Lambda | CoreA | A24',
        'Lambda | CoreA | A25',
        'Lambda | CoreC | C4',
        'Indice | Session | Default Storage',
        'Indice | Session | Default Security'
    ]

)