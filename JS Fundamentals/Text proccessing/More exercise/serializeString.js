function serialize([string]) {

    // Create object with unique characters and their indexes through the string as value stored in array
    let serialization = {};

    for (let i = 0; i < string.length; i++) {
        let char = string[i];
        if (!serialization[char]) {
            serialization[char] = [i];
        } else {
            serialization[char].push(i);
        }
    }

    Object.keys(serialization).forEach(key => {
        console.log(`${key}:${serialization[key].join('/')}`);
    })

}

serialize(["avjavamsdmcalsdm"]);