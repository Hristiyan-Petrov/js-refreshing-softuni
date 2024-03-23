// Closure usage

function solution() {
    let initial = '';
    
        // let appendInner = param => initial += param;
    
    return {
        append: appendInner,
        removeStart: n => initial = initial.slice(n),
        removeEnd: n => initial = initial.slice(0, -n),
        print: () => console.log(initial)
    }

    function appendInner(param) {
        return initial += param;
    }
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();