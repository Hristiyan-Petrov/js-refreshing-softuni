function outer() {
    const inner = function () { console.log(this) }
    inner();

}

const obj = {
    name: 'Peter',
    func: outer
};

obj.func();
