function solve(elements) {
    let result = [];
    let biggestNum = 0;

    let filterFunction = function (el, i) {
        if (i == 0 || el >= Math.max(...elements.slice(0, i))) {
            return true;
        } else {
            return false
        }
    }
    
    elements = elements.filter(filterFunction);

    // elements = elements.filter((el, i, arr) => {
    //     let slicedArr = arr.slice(0, i);

    //     if (i === 0 || el >= Math.max.apply(null, slicedArr)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });


    // for (let el of elements) {
    //     if (el >= biggestNum) {
    //         biggestNum = el;
    //         result.push(el);
    //     }
    // }

    console.log(elements.join(' '));

}
solve([1, 3, 8, 4, 10, 12, 3, 2, 24]);