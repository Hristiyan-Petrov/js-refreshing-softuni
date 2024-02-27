function solve(input) {
    // let totalStudentPerHour = 0;
    // for (let i = 0; i < 3; i++) {
    //     totalStudentPerHour += Number(input.shift());
    // }
    // Commented equals to the following line
    let totalStudentPerHour = input.splice(0, 3).reduce((acc, n) => acc + Number(n), 0);
    let students = Number(input.shift());

    let breakHour = 3;
    let totalHours = 0;

    for (let i = students; i > 0; i -= totalStudentPerHour) {
        if (totalHours % 3 === 0 && totalHours !== 0) {
            totalHours++;
            students += totalStudentPerHour;
            continue;
        }

        totalHours++;
    }

    // while (students > 0) {
    //     if (totalHours % 4 === 0 && totalHours !== 0) {
    //         // totalHours++;
    //         continue;
    //     }
    //     students -= totalStudentPerHour;
    //     totalHours++;
    // }

    // if ((totalHours + 1) % breakHour === 0) {
    //     totalHours++;
    // }

    console.log(`Time needed: ${totalHours}h.`);
}

solve(['1', '2', '3', '45']);