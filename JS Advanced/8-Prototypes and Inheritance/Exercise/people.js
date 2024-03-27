function createPeopleClasses() {

    let Employee = function (name, age) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }

    Employee.prototype.work = function () {
        let currentTask = this.tasks.shift();
        console.log(currentTask);
        this.tasks.push(currentTask);
    }

    Employee.prototype.collectSalary = function () {
        console.log(`${this.name} received ${this.getSalary()} this month.`);
    }

    Employee.prototype.getSalary = function () {
        return this.salary;
    }

    // Junior
    let Junior = function (name, age) {
        Employee.call(this, name, age);
        this.tasks.push(`${this.name} is working on a simple task.`);
    }
    Junior.prototype = Object.create(Employee.prototype);

    // Senior
    let Senior = function (name, age) {
        Employee.call(this, name, age);
        this.tasks.push(`${name} is working on a complicated task.`)
        this.tasks.push(`${name} is taking time off work.`)
        this.tasks.push(`${name} is is supervising junior workers.`)
    }
    // Senior.prototype = Object.create(Employee.prototype);
    Object.setPrototypeOf(Senior.prototype, Employee.prototype);


    // Manager
    let Manager = function (name, age) {
        Employee.call(this, name, age);
        this.dividend = 0;
        this.tasks.push(`${this.name} scheduled a meeting.`);
        this.tasks.push(`${this.name} is preparing a quarterly report.`);
    }
    Manager.prototype = Object.create(Employee.prototype);
    Manager.prototype.getSalary = function () {
        return this.salary + this.dividend;
    }

    // class Employee {
    //     constructor(name, age) {
    //         if (new.target === Employee) {
    //             throw new Error('Cannot initiate directly!');
    //         }

    //         this.name = name;
    //         this.age = age;
    //         this.salary = 0;
    //         this.tasks = [];
    //     }

    //     work() {

    //     }

    //     collectSalary() {
    //         console.log(`${this.name} received ${this.getSalary()} this month.`);
    //     }

    //     getSalary() {
    //         return this.salary;
    //     }
    // }

    // class Junior extends Employee {
    //     constructor(name, age) {
    //         super(name, age);
    //         this.tasks.push(`${this.name} is working on a simple task.`);
    //     }
    // }

    return {
        Employee,
        Junior,
        Senior,
        Manager
    }
}

// Test

let result = createPeopleClasses();
var guy1 = new result.Junior('dragan', 23);
var guy1parent = Object.getPrototypeOf(Object.getPrototypeOf(guy1));
var guy2 = new result.Senior('petkan', 24);
var guy2parent = Object.getPrototypeOf(Object.getPrototypeOf(guy2));
var guy3 = new result.Manager('bojan', 25);
var guy3parent = Object.getPrototypeOf(Object.getPrototypeOf(guy3));

// console.log(guy1parent === Object.prototype);
// console.log(guy2parent === Object.prototype);
// console.log(guy3parent === Object.prototype);

// console.log(guy1parent === guy2parent);
// console.log(guy2parent === guy3parent);
// console.log(guy1parent === guy3parent);

// console.log(guy1.salary) // 0
// guy1.salary = 1000;
// console.log(guy1.salary) // 1000

// console.log(guy2.salary) // 0
// guy2.salary = 2000;
// console.log(guy2.salary) // 2000
// console.log(guy2.getSalary());

// console.log(guy3.salary) // 0
// console.log(guy3.dividend) // 0
// guy3.salary = 3000;
// guy3.dividend = 500;
// console.log(guy3.salary) // 3000
// console.log(guy3.dividend) // 500
// console.log(guy3.getSalary());

guy2.work();
guy2.work();
guy2.work();
guy2.work();
guy2.work();
guy2.work();
guy2.work();
guy2.work();
guy2.work();