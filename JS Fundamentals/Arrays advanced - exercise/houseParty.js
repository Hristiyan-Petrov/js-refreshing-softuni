let trackGuests = function (input) {
    let list = [];

    for (let message of input) {
        message = message.split(' ');
        let name = message.shift();

        if (message[1] === 'not') {
            let inList = false;

            for (let guest of list) {
                if (guest === name) {
                    inList = true;
                }
            }

            if (inList) {
                list.splice(list.indexOf(name), 1);
            } else {
                console.log(`${name} is not in the list!`);
            }

            // if (list.includes(name)) {
            //     list.splice(list.indexOf(name), 1);
            // } else {
            //     console.log(`${name} is not in the list!`);
            // }
        } else {
            if (!list.includes(name)) {
                list.push(name);
            } else {
                console.log(`${name} is already in the list`);
            }
        }
    }

    return list.sort((a, b) => a.localeCompare(b));
}

let guestList = trackGuests(['Allie is going!',
'George is going!',
'John is not going!',
'George is not going!']
)

console.log('Guests are: \n' + guestList.join('\n'));