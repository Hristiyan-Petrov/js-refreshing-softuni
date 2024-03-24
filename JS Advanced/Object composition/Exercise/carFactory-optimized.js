function carFactory(order) {
    let engines = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ];
  
    let carriages = [
        { type: 'hatchback', color: order.color },
        { type: 'coupe', color: order.color }
    ];
  
    let wheels = Array(4).fill(order.wheelsize % 2 === 0 ? order.wheelsize - 1 : order.wheelsize);
  
    return {
        model: order.model,
        engine: engines.find(e => e.power >= order.power),
        carriage: carriages.find(c => c.type === order.carriage),
        wheels: wheels
    };
}

console.log(carFactory({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));

// Output: 
// { model: 'VW Golf II',
//   engine: { power: 90, volume: 1800 },
//   carriage: { type: 'hatchback', color: 'blue' },
//   wheels: [ 13, 13, 13, 13 ] }

console.log(carFactory({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
}));

// Output: 
// { model: 'Opel Vectra',
//   engine: { power: 120, volume: 2400 },
//   carriage: { type: 'coupe', color: 'grey' },
//   wheels: [ 17, 17, 17, 17 ] }