function handleParty(input) {
    let guestList = {
        vip: [],
        regular: []
    };

    let guest = input.shift();

    while (guest !== 'PARTY') {
        insertGuest(guest);
        guest = input.shift();
    }

    for (let commingGuest of input) {

        let type = isVip(commingGuest) ? 'vip' : 'regular';
        // console.log(guestList[type]);
        // let included = guestList[type].find(x => x[commingGuest]);

        for (let guest of guestList[type]) {
            if (guest[commingGuest] === false) {
                guest[commingGuest] = true;
            }
        }

        // console.log(Object.values(guestList));

        // if (Object.values(guestList).includes(commingGuest)) {
        //     guestList[commingGuest] = true;
        // }
    }

    let notCame = Array.from(Object.keys(guestList)).filter(x => guestList[x] === false);
    let hasVIP = notCame.filter(guest => !isNaN(parseFloat(guest[0])));

    console.log(notCame.length);


    function insertGuest(guest) {
        let vip = isVip(guest);

        if (vip) {
            guestList.vip.push({ [guest]: false });
        } else {
            guestList.regular.push({ [guest]: false });
        }
    }

    function isVip(guest) {
        return !isNaN(parseFloat(guest[0]));
    }
}

handleParty(['7IK9Yo0h',
    '9NoBUajQ',
    'Ce8vwPmE',
    'SVQXQCbc',
    'tSzE5t0p',
    'PARTY',
    '9NoBUajQ',
    'Ce8vwPmE',
    'SVQXQCbc'
]


)
if (hasVIP.length > 0) {
    notCame.sort((a, b) => a.localeCompare(b)).forEach(x => console.log(x));
} else {
    notCame.forEach(x => console.log(x));
}

function sortVIP(a, b) {
    return a[0].charCodeAt() - b[0].charCodeAt();
}