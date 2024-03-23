class Rat {
    constructor(name) {
        this.name = name;
        this.uniteds = [];
    }

    unite(otherRat) {
        if (otherRat instanceof Rat) {
            this.uniteds.push(otherRat);
        }
    }

    getRats() {
        return this.uniteds;
    }

    toString() {
        let result = `${this.name}`;
        this.uniteds.forEach(ratInstance => {
            result += `\n##${ratInstance.name}`;
        });

        return result;
    }

}



let firstRat = new Rat("Peter");
console.log(firstRat.toString());  // Output: Peter
console.log(firstRat.getRats());  // Output: []

firstRat.unite(new Rat("George"));
firstRat.unite(new Rat("Alex"));
console.log(firstRat.getRats());
// Output: [ Rat { name: 'George', unitedRats: [] }, Rat { name: 'Alex', unitedRats: [] }]

console.log(firstRat.toString());
// Output:
// Peter
// ##George
// ##Alex