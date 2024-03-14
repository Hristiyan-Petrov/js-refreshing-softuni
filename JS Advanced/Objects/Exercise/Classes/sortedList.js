class List {
    constructor() {
        this.elements = [];
    }

    add(element) {
        this.elements.push(element);

        // sort right after pushing new element the array of elements 
        this.elements = this.elements.sort((a, b) => a - b);
        return this;
    }

    remove(index) {
        if (!this.checkIndex(index)) {
            return;
        }

        this.elements.splice(index, 1);
        return this;
    }

    get(index) {
        if (!this.checkIndex(index)) {
            return;
        }

        return this.elements[index];
    }

    get size() { 
        return this.elements.length
    }


    checkIndex(i) {
        if (i < 0 || i >= this.elements.length) {
            console.error('Invalid index');
            return false;
        }
        return true;
    }
}

let list = new List();
console.log(list.add(5));
console.log(list.add(6));
console.log(list.add(7));
console.log(list.get(1));
list.remove(1); console.log();
console.log(list.get(1));
