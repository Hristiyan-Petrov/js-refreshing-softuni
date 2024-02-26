function createDictionary(data) {

    let dictionary = {};

    for (let line of data) {
        Object.entries(JSON.parse(line)).forEach(([key, value]) => {
            // console.log(`Key: ${key} -> ${value}`);

            let [currTerm, definition] = [key, value];

            // for (let term of dictionary) {
            // if (term[currTerm] = )
            dictionary[currTerm] = definition;

            // }
        });
    }

    Object.keys(dictionary).sort((a, b) => a.localeCompare(b)).forEach(term => {
        console.log(`Term: ${term} => Definition: ${dictionary[term]}`);
    });

}

createDictionary(
    [
        '{"Cup":"A small bowl-shaped container for drinking from, typically having a handle"}',
        '{"Cake":"An item of soft sweet food made from a mixture of flour, fat, eggs, sugar, and other ingredients, baked and sometimes iced or decorated."} ',
        '{"Watermelon":"The large fruit of a plant of the gourd family, with smooth green skin, red pulp, and watery juice."} ',
        '{"Music":"Vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion."} ',
        '{"Art":"The expression or application of human creative skill and imagination, typically in a visual form such as painting or sculpture, producing works to be appreciated primarily for their beauty or emotional power."} ',
        '{"Cup":"Appliance for helping you get drunk, keeps the liquid in one place, making it easy for consuming"}',
    ]
)