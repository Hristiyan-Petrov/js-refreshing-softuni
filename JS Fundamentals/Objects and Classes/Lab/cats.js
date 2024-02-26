function catClass(input) {

    let cats = [];

    class Cat {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        meow() {
            console.log(`${this.name}, age ${this.age} says Meow`);
        }
    }

    input.map(cat => {
        let [name, age] = cat.split(' ');
        let currCat = new Cat(name, Number(age));
        return currCat;
    }).forEach(cat => cat.meow());

    for (let cat of input) {
        cats.push(new Cat(name, age));
    }

    for (let cat of cats) {
        cat.meow();
    }

}

catClass(['Mellow 2', 'Tom 5']);