function solve() {

    let list = [];

    list.add = el => list.push(el) && sortList();
    list.remove = i =>  checkIndexAndPerformOperation(i, () => list.splice(i, 1)) && sortList();
    list.get = i => checkIndexAndPerformOperation(i, () => list[i]);
    list.size = 0;

    return list;

    function sortList() {
        list = list.sort((a, b) => a - b);
        list.size = list.length;
    }

    function checkIndexAndPerformOperation(i, operation) {
        if (i < list.length) {
            return operation();
        } 
        // else {
        //     throw new Error('There is no number at that index!');
        // }
    }
}

let result = solve();
myList = result;

for (let i = 0; i < 10; i++) {
    myList.add(i);
}

myList.remove(9);
myList.remove(0);
console.log(myList.size);