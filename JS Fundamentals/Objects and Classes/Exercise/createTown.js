function createTown(towns) {

    towns.forEach(town => {
        [town, latitude, longitude] = town.split(' | ');

        // let currentTown = {
        //     town: town[0],
        //     latitude: Number(town[1]).toFixed(2),
        //     longitude: Number(town[2]).toFixed(2)
        // };

        let currentTown = {
            town,
            latitude: Number(latitude).toFixed(2),
            longitude: Number(longitude).toFixed(2),
            
        }
        console.log(currentTown);
    });



    // { town: 'Sofia', latitude: '42.70', longitude: '23.33' }
    // { town: 'Beijing', latitude: '39.91', longitude: '116.36' }
}

createTown(['Sofia | 42.696552 | 23.32601',
    'Beijing | 39.913818 | 116.363625']
);