function createCity(name, area, population, country, postcode) {
    let city = {
        name,
        area,
        population,
        country,
        postcode
    };

    Object.entries(city).forEach(([key, value]) => {
        console.log(`${key} -> ${value}`);
    });
}

createCity("Sofia"," 492", "1238438", "Bulgaria", "1000");