function getPascalRow(n) {
    let row = [1];

    for(let i = 0; i < n; i++) {
        row.unshift(0);

        for(let j = 0; j < i + 1; j++) {
            row[j] = row[j] + row[j + 1];
        }
    }
    return row.join(' ');
}

let res = getPascalRow(5);
console.log(res);