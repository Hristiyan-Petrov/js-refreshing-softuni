(() => {
    String.prototype.ensureStart = function (str) {
        if (this.indexOf(str) !== 0 && this.indexOf(str) !== -1) {
            return str + this.toString();
        } else {
            return this.toString();
        }
    }

    String.prototype.ensureEnd = function (str) {
        if (this.lastIndexOf(str) !== this.toString().length - str.length) {
            return this.toString() + str;
        } else {
            return this.toString();
        }
    }

    String.prototype.isEmpty = function () {
        if (this.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    String.prototype.truncate = function (n) {
        if (this.length <= n) {
            return this.toString();
        }

        if (n < 4) {
            return '.'.repeat(n);
        }

        if (this.includes(' ')) {
            let str = this.toString();

            while (str.length > n) {
                let lastSpace = str.lastIndexOf(' ');
                str = str.substring(0, lastSpace).trim();
            }

            return str + '...';
        } else {
            return this.substring(0, n - 3) + '...';
        }
    };

    String.format = function (string, ...params) {
        params.forEach(param => {
            let placeholderStart = string.indexOf('{');
            if (placeholderStart >= 0) {
                let placeholder = string.substring(placeholderStart, placeholderStart + 3);
                string = string.replace(placeholder, param);
            }
        });
        return string;
    }
})();


var testString = 'the quick brown fox jumps over the lazy';
var answer = testString.ensureEnd(' dog');
console.log(answer);
// expect(answer).to.equal('the quick brown fox jumps over the lazy dog', 'Incorrect ensureEnd() functionality');
answer = answer.ensureEnd(' dog');
console.log(answer);