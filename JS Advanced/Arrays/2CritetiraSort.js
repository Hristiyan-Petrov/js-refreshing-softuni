function sotring(input) {

    input.sort((a, b) => {
        if (a.length - b.length === 0) {
            return a.localeCompare(b);
        }

        return a.length - b.length;
    })
    .forEach(el => {
        console.log(el);
    });

}

sotring(['alpha',

'beta',

'gamma']);