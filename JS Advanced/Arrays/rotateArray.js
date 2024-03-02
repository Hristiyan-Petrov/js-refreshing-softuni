function rotateArray(input) {
    let n = Number(input.pop());

    for (let i = 0; i < n; i++) {
        input.unshift(input.pop());
    }

    console.log(input.join(' '));
}

rotateArray(['1',

'2',

'3',

'4',

'2'])