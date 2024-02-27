function solve(input) {
    let register = {};

    for (let line of input) {
        let [student, ...grades] = line.split(' ');

        if (!register[student]) {
            register[student] = grades.map(Number);
        } else {
            register[student] = register[student].concat(grades.map(Number));
        }
    }

    // let sortedRegister = Array.from(Object.entries(register));
    let sortedRegister = Array.from(Object.entries(register)).sort(sortByAverageGrade);

    for (let [student, grades] of sortedRegister) {
        console.log(`${student}: ${grades.join(', ')}`);
    }

    function sortByAverageGrade(a, b) {
        let aSum = a[1].reduce((acc, grade) => acc + grade) / a[1].length;
        let bSum = b[1].reduce((acc, grade) => acc + grade) / b[1].length;
        return aSum - bSum;
    }
}

solve(['Lilly 4 6 6 5',
'Tim 5 6',
'Tammy 2 4 3',
'Tim 6 6']

)