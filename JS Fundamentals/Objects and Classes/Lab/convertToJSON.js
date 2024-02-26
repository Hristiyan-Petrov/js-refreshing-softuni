function convertToJSON(name, lastName, hairColor) {
    let personData = {
        name,
        lastName,
        hairColor
    };

    let personJSON = JSON.stringify(personData);

    console.log(personJSON);
}

convertToJSON('George',
'Jones',
'Brown'
);