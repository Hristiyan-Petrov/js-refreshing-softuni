function extendProrotype(classToExtend) {
    // console.log(Object.getPrototypeOf(classToExtend));
    // console.log(classToExtend.prototype);
    // console.log(Object.getPrototypeOf(classToExtend) == classToExtend.prototype);
    // let prototype = Object.getPrototypeOf(classToExtend);
    
    let prototype = classToExtend.prototype;
    prototype.species = 'Human';
    prototype.toSpeciesString = function() {
        return `I am a ${prototype.species}. ` + this.toString();  
    }
}


class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    toString() {
        let className = this.constructor.name;
        return `${className} (name: ${this.name}, email: ${this.email})`;
    }
}

class Teacher extends Person {
    constructor(name, email, subject) {
        super(name, email);
        this.subject = subject;
    }
    toString() {
        let baseStr = super.toString().slice(0, -1);
        return baseStr + (this.subject) ? `, subject: ${this.subject})` : '';
    }
}

class Student extends Person {
    constructor(name, email, course) {
        super(name, email);
        this.course = course;
    }
    toString() {
        let baseStr = super.toString().slice(0, -1);
        return baseStr + `, course: ${this.course})`;
    }
}

extendProrotype(Person);
let p = new Teacher("Pesho","email@hit.bg");
console.log(p.species) // 'Human'
console.log(p.toSpeciesString()) // "I am a Human. Person (name: Pesho, email: email@hit.bg)"