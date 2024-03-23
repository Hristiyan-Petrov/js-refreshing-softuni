function rotateArray(array) {
    let rotations = Number(array.pop());

    if (isNaN(rotations)) {
        console.log('Empty');
        array.length = 0;
    } 

    for (let i = 0; i < rotations; i++) {
        
        let movedElement = array.pop();
        array.unshift(movedElement);
    }

    if (array.length) {
        console.log( array.join(' '));
    } 
}

let result = rotateArray(['Banana', 'Orange', 'Coconut', 'Apple', 15]);