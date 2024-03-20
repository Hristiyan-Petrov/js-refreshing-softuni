class Company {
    constructor() {
        this.departments = new Map();
    }

    addEmployee(name, salary, position, department) {
        if (!name || !salary || !position || !department || salary < 0) {
            throw new Error('Invalid input!');
        }

        if (!this.departments.has(department)) {
            this.departments.set(department, []);
        }

        this.departments.get(department).push({ name, salary, position });

        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }

    bestDepartment() {
        let bestDepartment;
        let bestAvg = 0;

        for (let [department, employees] of this.departments) {
            let totalSalary = employees.reduce((acc, x) => acc + x.salary, 0);
            let avgSalary = totalSalary / employees.length;

            if (avgSalary > bestAvg) {
                bestAvg = avgSalary;
                bestDepartment = department;
            }
        }

        let output = [];
        output.push(`Best Department is: ${bestDepartment}`);
        output.push(`Average salary: ${bestAvg.toFixed(2)}`);
        
        this.departments.get(bestDepartment)
            .sort((a, b) => b.salary - a.salary || a.name.localeCompare(b.name))
            .forEach(employee => {
                output.push(`${employee.name} ${employee.salary} ${employee.position}`)
            });

        return output.join('\n');
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

console.log(c.bestDepartment());