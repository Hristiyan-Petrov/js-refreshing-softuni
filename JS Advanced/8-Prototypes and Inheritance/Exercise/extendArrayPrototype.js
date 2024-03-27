(function extendArray() {
    // 	average() - returns the average of all array elements

    Array.prototype.last = function () {
        return this[this.length - 1];
    }

    Array.prototype.skip = function(n) {
        return this.slice(n)
    }

    Array.prototype.take = function(n) {
        return this.slice(0, n);
    }

    Array.prototype.sum = function() {
        return this.reduce((acc, x) => acc + x, 0);
    }

    Array.prototype.average = function() {
        return this.sum() / this.length;
    }

})();

let myArr = [1, 3, 65, 89, 4, 7, 100]
console.log(myArr.average());