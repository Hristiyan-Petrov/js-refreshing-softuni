function convertJSON(data) {

    // console.log(data);

    let object = JSON.parse(data);
    
    // console.log(object);

    Object.keys(object).forEach(key => {
        console.log(`${key}: ${object[key]}`);
    })
}

convertJSON('{"name": "George", "age": 40, "town": "Sofia"}')