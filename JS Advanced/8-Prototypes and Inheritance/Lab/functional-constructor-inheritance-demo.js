function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.speak = function() {
    console.log(`Hi bithez :D! ${this.firstName} ${this.lastName} is here`);
}

function Student (firstName, lastName, course) {
    // analogue  of calling parent constructor with 'super' keyword - super(firstName, lastName);
    Person.call(this, firstName, lastName); // calling the parent constructor using call method // how super() works behind the scenes
    this.course = course;
}

// console.log(Person.prototype);
// console.log(Student.prototype);
Student.prototype = Object.create(Person.prototype); // creating a new object from prototype of Person // this is how 'extends' keyword work behind the scenes
// console.log(Student.prototype);
// console.log(Student.prototype == Person);


Student.prototype.getGrades = function() {
    console.log(`My grade at my course ${this.course} is 5-6, whatever...`);  
}

function createNew(constructor, ...args) {
    // Step 1 - Create new object
    let newObj = {};

    // Step 2 - Set prototype
    Object.setPrototypeOf(newObj, constructor.prototype); // Equals {child} extends {parent}

    // Steps 1 and 2 merged into one line
    // let newObj = Object.setPrototypeOf({}, constructor.prototype);
    // let newObj = Object.create(constructor.prototype);

    // Step 3 - Call constructor with context
    constructor.apply(newObj, args);

    // Step 4 - Return the new object
    return newObj;
}

// let student = new Student('Hris', 'Bachka dosta', 'JS Advanced 3 years later...');
let student = createNew(Student, 'Hris', 'Bachka dosta', 'JS Advanced 3 years later...');

// console.log(typeof student);
for (const key in student) {
    if (student.hasOwnProperty(key)) {
        console.log(`This is mine -> ${key}`);
    } else {
        console.log(`This is NOT mine -> ${key}`);
    }
}