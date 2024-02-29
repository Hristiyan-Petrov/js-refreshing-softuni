function handleEmplyees(input) {
    let companies = {};

    for (let line of input) {
        let [company, employeeId] = line.split(' -> ');

        if (!companies[company]) {
            companies[company] = [employeeId];
        } else {
            // Keep in mind that a company cannot have two employees with the same id
            if (!companies[company].includes(employeeId)) {
                companies[company].push(employeeId);
            }
        }
    }

    Array.from(Object.keys(companies)).sort((a, b) => a.localeCompare(b)).forEach(key => {
        console.log(key);

        for (let employeeId of companies[key]) {
            console.log(`-- ${employeeId}`);
        }
    });
}

handleEmplyees(
    [
        'SoftUni -> AA12345',
        'SoftUni -> CC12344',
        'Lenovo -> XX23456',
        'SoftUni -> AA12345',
        'Movement -> DD11111',
        'Movement -> DD11111'

    ]


)