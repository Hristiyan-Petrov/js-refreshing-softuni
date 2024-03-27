function personAndTeacher() {

    let Person = function(name, email) {
        this.name = name;
        this.email = email;
    }

    let Teacher = function(name, email, subject) {
        Person.call(this, name, email); // calling the parent constructor using call method - this is how the 'super()' works behind the scenes
        this.subject = subject;
    }

    Teacher.prototype = Object.create(Person.prototype); // this is how 'extends' keyword work behind the scenes

    // class Person {
    //     constructor(name, email) {
    //         this.name = name;
    //         this.email = email;
    //     }
    // }

    // class Teacher1 extends Person {
    //     constructor(name, email, subject) {
    //         super(name, email);
    //         this.subject = subject;
    //     }
    // }

    return {
        Person,
        Teacher
    }
}

let classes = personAndTeacher();
console.log(classes);