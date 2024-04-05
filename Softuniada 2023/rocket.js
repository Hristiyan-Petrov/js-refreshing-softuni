function logRocket(size) {
    // Function to create a part of the rocket
    const createPart = (char, count, size) => {
        const sidePadding = '_'.repeat(size - count);
        const middlePart = char.repeat(count * 2 + 1);
        return `${sidePadding}${middlePart}${sidePadding}`;
    };

    // Function to log the rocket
    const buildRocket = (size) => {
        let rocket = '';

        // Top of the rocket
        rocket += createPart('^', 0, size) + '\n';

        // Fins and body of the rocket
        for (let i = 1; i <= size; i++) {
            rocket += createPart('/', i, size) + '\n';
            rocket += createPart('|', i, size) + '\n';
        }

        // Base of the rocket
        rocket += createPart('~', 0, size) + '\n';

        // Exhaust of the rocket
        rocket += createPart('!', 0, size) + '\n';
        if (size > 4) {
            rocket += createPart('!', 1, size) + '\n';
        }

        return rocket;
    };

    console.log(buildRocket(size));
}

// Example usage:
logRocket(4);
//   logRocket(6);
//   logRocket(8);
