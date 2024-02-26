function createList(employees) {

    // let employeesList = {};

    // for (let employee of employees) {
    //     employeesList[employee] = employee.length;
    // }


    // for (let  key in employeesList) {
    //     console.log(`Name: ${key} -- Personal Number: ${employeesList[key]}`);
    // }


    let employeesList = [];

    for (let employee of employees) {
        let newEmployee = {
            name: employee,
            id: employee.length
        }

        employeesList.push(newEmployee);
    }

    // console.log(employeesList);

    for (let employee of employeesList) {
        // console.log(employee);
        console.log(`Name: ${employee.name} -- Personal Number: ${employee.id}`);
    }
}

createList([

    'Silas Butler',
    
    'Adnaan Buckley',
    
    'Juan Peterson',
    
    'Brendan Villarreal'
    
    ]);