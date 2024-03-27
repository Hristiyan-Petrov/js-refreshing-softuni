// function createClasses() {
//     class Figure {
//         constructor(unit = 'cm') {
//             this.unit = unit;
//         }

//         unitsMultiply = {
//             'cm': 1,
//             'mm': 10,
//             'm': 0.01
//         };

//         get area() {
//             return 0;
//         }

//         toString() {
//             return `Figures units: ${this.constructor.name} Area: ${this.area} - `;
//         }

//         changeUnits(newUnit) {
//             this.unit = newUnit;
//         }
//     }

//     class Circle extends Figure {
//         constructor(radius, unit) {
//             super(unit);
//             this.radius = radius * this.unitsMultiply[unit];
//         }

//         get area() {
//             return super.area + Math.PI * this.radius ** 2;
//         }

//         toString() {
//             let baseStr = super.toString();
//             return baseStr + `radius: ${this.radius}`;
//         }

//         changeUnits(newUnit) {
//             super.changeUnits(newUnit);
//             this.radius *= this.unitsMultiply[newUnit];
//         }
//     }



//     class Rectangle extends Figure {
//         constructor(width, height, unit) {
//             super(unit);
//             this.width = width * this.unitsMultiply[unit];
//             this.height = height * this.unitsMultiply[unit];
//         }

//         get area() {
//             return super.area + this.width * this.height;
//         }

//         toString() {
//             let baseStr = super.toString();
//             return baseStr + `width: ${this.width}, height: ${this.height}`
//         }

//         changeUnits(newUnit) {
//             super.changeUnits(newUnit);
//             this.width *= this.unitsMultiply[newUnit];
//             this.height *= this.unitsMultiply[newUnit];
//         }
//     }

//     return {
//         Figure,
//         Circle,
//         Rectangle
//     }
// }

function createClasses() {
    class Figure {
        units = "cm";

        changeUnits(units) {
            this.units = units;
        }

        getMultiplier(unit = this.units) {
            const unitsMap = {
                'm': 0.01,
                'cm': 1,
                'mm': 10
            };

            return unitsMap[unit];
        }
    }

    class Circle extends Figure {
        constructor(radius, unit = 'cm') {
            super();
            this._radius = radius;
            this.changeUnits(unit);
        }

        get radius() {
            return this._radius * this.getMultiplier();
        }

        changeUnits(newUnit) {
            super.changeUnits(newUnit);
        }

        get area() {
            return Math.PI * this.radius ** 2;
        }

        toString() {
            return `Figures units: ${this.units} Area: ${this.area} - radius: ${this.radius}`;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, unit = 'cm') {
            super();
            this._width = width;
            this._height = height;
            this.changeUnits(unit);
        }

        get width() {
            return this._width * this.getMultiplier();
        }

        get height() {
            return this._height * this.getMultiplier();
        }

        changeUnits(newUnit) {
            super.changeUnits(newUnit);
        }

        get area() {
            return this.width * this.height;
        }

        toString() {
            return `Figures units: ${this.units} Area: ${this.area} - width: ${this.width}, height: ${this.height}`;
        }
    }

    return {
        Figure,
        Circle,
        Rectangle
    }
}



let result = createClasses();
// let c = new result.Circle(5);
// console.log(c.area); // 78.53981633974483
// console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new result.Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

// c.changeUnits('mm');
// console.log(c.area); // 7853.981633974483
// console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50
