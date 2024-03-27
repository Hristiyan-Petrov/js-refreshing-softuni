function personAndTeacher() {

    let Person = function(name, email) {
        this.name = name;
        this.email = email;
    }

    // class Person {
    //     constructor(name, email) {
    //         this.name = name;
    //         this.email = email;
    //      }
    //  }

    Person.prototype.toString = function() {
        console.log(`${this.constructor.name} (name: ${this.name}, email: ${this.email}${
            this.subject ? `, subject: ${this.subject}` : ""}${
            this.course ? `, course: ${this.course}` : ""})`);
    }

    let Teacher = function(name, email, subject) {
        Person.call(this, name, email); // calling the parent constructor using call method - this is how the 'super()' works behind the scenes
        this.subject = subject;
    }
    Teacher.prototype = Object.create(Person.prototype); // this is how 'extends' keyword work behind the scenes

    // class Teacher extends Person {
    //     constructor(name, email, subject) {
    //         super(name, email);
    //         this.subject = subject;
    //     }
    // }

    let Student = function(name, email, course) {
        Person.call(this, name, email);
        this.course = course;
    }
    Student.prototype = Object.create(Person.prototype);

    // class Student extends Person {
        // constructor(name, email, course) {
        //     super(name, email);
        //     this.course = course;
        // }
    // }

    // Student.prototype.toString = function() {
    //     console.log(`Student (name: ${this.name}, email: ${this.email}, course: ${this.course})`);
    // }

    return {
        Person,
        Teacher,
        Student
    }
}

let classes = personAndTeacher();
let Person = classes.Person;
let Teacher = classes.Teacher;
let Student = classes.Student;

// expect(p.toString()).to.equal('Person (name: Pesho, email: Pesho@pesh.com)');

// let classes = personAndTeacher();
// let Person = classes.Person;
// let Teacher = classes.Teacher;
// let Student = classes.Student;

let p = new Student("Pesho",'Pesho@pesh.com', 'JS developing');
p.toString(); // Person (name: Pesho, email: Pesho@pesh.com)