function solve(input) {

    const carFactoryBuilder = function () {
        let cars = {};

        return {
            create: ([name, doesInherit, inheritParentName]) => {
                cars[name] = {
                    ownProps: [],
                    inheritedProps: [],
                    inheritParentName: inheritParentName || false,
                    inheritingChild: null
                };

                if (doesInherit) {
                    cars[inheritParentName].inheritingChild = name;
                }

            },
            set: ([name, key, value]) => {
                let newProp = { [key]: value };
                cars[name].ownProps.push(newProp);

                (function setInheriting(name) {
                    let child = cars[name].inheritingChild;
                    if (child) {
                        cars[child].inheritedProps.push(newProp);
                        setInheriting(child);
                    }
                })(name);

            },
            print: name => {
                let result = cars[name].ownProps
                    .concat(cars[name].inheritedProps)
                    .map(x => Object.entries(x).map(([key, value]) => `${key}:${value}`))
                    .join(', ');

                console.log(result);
            }
        }
    }

    let carFactory = carFactoryBuilder();

    input
        .map(x => x.split(' '))
        .forEach(([command, ...args]) => carFactory[command](args)); // both work 
        // .forEach(([command, ...args]) => carFactory[command].bind(args));
}

solve([
    'create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'
]);