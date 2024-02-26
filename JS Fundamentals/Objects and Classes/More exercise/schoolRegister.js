function solve(input) {

    let register = [];
    let smallestGrade = 11;

    //Create a register with input data of students
    for (let data of input) {
        let [name, grade, average] = data.split(', ');
        name = name.split(': ')[1];
        grade = Number(grade.split(': ')[1]);
        average = Number(average.split(': ')[1]);

        if (average < 3) {
            continue;
        }

        if (grade < smallestGrade) {
            smallestGrade = grade;
        }

        register.push({
            name,
            grade,
            average
        });
    }

    // Print the register by condition of task (условие по задачата) -> print every grade (school class) grouped
    for (let i = smallestGrade; i < 12; i++) {

        let students = register.filter(student => {
            if (student.grade === i) {
                return student.name;
            }
        });

        if (students.length < 1) {
            continue;
        }

        console.log(`${i + 1} Grade`);
        let studentNames = students.map(student => student.name).join(', ');
        let studentsAverage = students.reduce((acc, student) => acc + student.average, 0) / students.length;

        console.log(`List of students: ${studentNames}`);
        console.log(`Average annual score from last year: ${studentsAverage.toFixed(2)}\n`);
    }
}

solve(
    [
        'Student name: George, Grade: 5, Graduated with an average score: 2.75',
        'Student name: Alex, Grade: 9, Graduated with an average score: 3.66',
        'Student name: Peter, Grade: 8, Graduated with an average score: 2.83',
        'Student name: Boby, Grade: 5, Graduated with an average score: 4.20',
        'Student name: John, Grade: 9, Graduated with an average score: 2.90',
        'Student name: Steven, Grade: 2, Graduated with an average score: 4.90',
        'Student name: Darsy, Grade: 1, Graduated with an average score: 5.15'
    ]


)