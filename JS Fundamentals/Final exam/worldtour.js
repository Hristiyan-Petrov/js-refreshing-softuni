function travel(input) {
    let string = input.shift();

    for (let line of input) {

        if (line.includes('Add Stop')) {
            let [command, index, insertion] = getDetails(line);

            // Insert the given string at that index only if the index is valid.
            if (string[index]) {   
                string = string.slice(0, index) + insertion + string.slice(index); 
            }

        } else if (line.includes('Remove Stop')) {
            let [command, startIndex, endIndex] = getDetails(line);

            // Remove the elements of the string from the starting index to the end index (inclusive) if both indices are valid.
            if (string[startIndex] && string[endIndex]) {
                let removal = string.slice(startIndex, Number(endIndex) + 1);
                string = string.replace(removal, '');
            }

        } else if (line.includes('Switch')) {
            let [command, oldString, newString] = getDetails(line);

            // If the old string is in the initial string, replace it with the new one (all occurrences).
            if (string.includes(oldString)) {
                string = string.replace(oldString, newString);
            }

        } else {
            console.log('Ready for world tour! Planned stops: ' + string);
            return;
        }

        console.log(string);

    }

    function getDetails(command) {
        return command.split(':');
    }
}

travel(
    (["Albania:Bulgaria:Cyprus:Deuchland",
"Add Stop:3:Nigeria",
"Remove Stop:4:8",
"Switch:Albania: Azərbaycan",
"Travel"])


)