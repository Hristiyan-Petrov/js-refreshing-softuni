function deserialize(input) {
    let stringArray = [];
    let line = input.shift();

    while (line !== 'end') {
        let [char, indexes] = line.split(':');
        indexes = indexes.split('/');

        for (let index of indexes) {
            stringArray[Number(index)] = char;
        }
        line = input.shift();

    }

    console.log(stringArray.join(''));
}

deserialize(['a:0/3/5/11',
    'v:1/4',
    'j:2',
    'm:6/9/15',
    's:7/13',
    'd:8/14',
    'c:10',
    'l:12',
    'end']
)