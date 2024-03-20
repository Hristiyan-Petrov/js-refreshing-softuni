class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee(...args) {
        let [name, salary, position, department] = args;
        
        let errorMessage = '';
        let hasEmptyString = args.some === '';

        // error handling        
        // one of the passed parameters is empty string (""), undefined or null,  this function should throw an error with the following message:
        if (hasEmptyString) {
            errorMessage = 'Invalid input!';
        } else if (salary < 0) {
            errorMessage = 'Invalid input!';
        }
        if (errorMessage !== '') {
            throw new Error(errorMessage);
        }

        // department modifying
        if (!this.departments.hasOwnProperty(department)) { // hasOwnProperty
            this.departments[department] = [{
                name,
                salary: Number(salary),
                position
            }];

        } else {
            this.departments[department].push({
                name,
                salary: Number(salary),
                position
            });
        }

        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }

    bestDepartment() {
        let [bestDepartment, employees, averageSalary] = this.findBestDeparment();

        // console.log(`Best department is: ${bestDepartment}`);
        // console.log(`Average salary: ${averageSalary}`);

        let result = `Best Department is: ${bestDepartment}\n`;
        result += `Average salary: ${averageSalary}\n`;

        // employees sorted by their salary by descending and by name 
        employees
            .sort((a, b) => b.salary - a.salary || a.name.localeCompare(b.name))
            .forEach(employee => {
            result += `${employee.name} ${employee.salary} ${employee.position}\n`;
        });

        return result.trim();
    }

    findBestDeparment() {
        let highestDeparmentAverageSalary = 0;
        let [departmentKey, departmentValue] = [null, null];

        Object.entries(this.departments).forEach(([currDepartment, employeesArr]) => {
            let currAverage = employeesArr.map(employee => employee.salary).reduce((acc, salary, i, arr) => acc + (salary / arr.length), 0);
            // console.log(currAverage);

            if (currAverage > highestDeparmentAverageSalary) {
                highestDeparmentAverageSalary = currAverage;
                [departmentKey, departmentValue] = [currDepartment, this.departments[currDepartment]];
            }
        });

        return [departmentKey, departmentValue, highestDeparmentAverageSalary.toFixed(2)];
    }
}

let c = new Company();
let actual1 = c.addEmployee("Stanimir", 2000, "engineer", "Human resources");
// let expected1 = "New employee is hired. Name: Stanimir. Position: engineer";

c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");

let act = c.bestDepartment();
console.log(c.bestDepartment());