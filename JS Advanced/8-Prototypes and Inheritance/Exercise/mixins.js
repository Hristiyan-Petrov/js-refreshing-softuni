function createMixins() {
    let computerQualityMixin = function (classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3;
        }

        classToExtend.prototype.isFast = function () {
            let condition = this.processorSpeed > (this.ram / 4);
            return isProperty(condition);
        }

        classToExtend.prototype.isRoomy = function () {
            let condition = this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed);
            return isProperty(condition);
        }
    }

    let styleMixin = function (classToExtend) {

        classToExtend.prototype.isFullSet = function () {
            let condition = (this.manufacturer === this.keyboard.manufacturer &&  this.manufacturer === this.monitor.manufacturer);
            return isProperty(condition);
        }

        classToExtend.prototype.isClassy = function () {
            let condition1 = this.battery.expectedLife >= 3;
            let condition2 = this.color === 'Silver' || this.color === 'Black';
            let condition3 = this.weight < 3;
            return isProperty(condition1 && condition2 && condition3);
        }

    }

    function isProperty(condition) {
        if (condition) {
            return true;
        } else {
            return false;
        }
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}



class Manufacturable {
    constructor(manufacturer) {
        if (new.target === Manufacturable) {
            throw new Error('Cannot instantiate an abstract class.');
        }
        this.manufacturer = manufacturer;
    }
}

class Monitor extends Manufacturable {
    constructor(manufacturer, width, height) {
        super(manufacturer);
        this.width = width;
        this.height = height;
    }
}

class Keyboard extends Manufacturable {
    constructor(manufacturer, responseTime) {
        super(manufacturer);
        this.responseTime = responseTime;
    }
}

class Battery extends Manufacturable {
    constructor(manufacturer, expectedLife) {
        super(manufacturer);
        this.expectedLife = expectedLife;
    }
}

class Computer extends Manufacturable {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
        if (new.target === Computer) {
            throw new Error("Cannot instantiate abstract class.");
        }
        super(manufacturer);
        this.processorSpeed = processorSpeed;
        this.ram = ram;
        this.hardDiskSpace = hardDiskSpace;
    }
}

class Laptop extends Computer {
    constructor(manufacturer, processorSpeed, ram, hardDisk, weight, color, battery) {
        super(manufacturer, processorSpeed, ram, hardDisk);
        this.weight = weight;
        this.color = color;
        this.battery = battery;
    }

    get battery() {
        return this._battery;
    }

    set battery(value) {
        if (!(value instanceof Battery)) {
            throw new TypeError("Passed argument was not a Battery.");
        }
        this._battery = value;
    }
}

class Desktop extends Computer {
    constructor(manufacturer, processorSpeed, ram, hardDisk, keyboard, monitor) {
        super(manufacturer, processorSpeed, ram, hardDisk);
        this.keyboard = keyboard;
        this.monitor = monitor;
    }

    get keyboard() {
        return this._keyboard;
    }

    set keyboard(value) {
        if (!(value instanceof Keyboard)) {
            throw new TypeError("Passed argument was not a Keyboard");
        }
        this._keyboard = value;
    }

    get monitor() {
        return this._monitor;
    }

    set monitor(value) {
        if (!(value instanceof Monitor)) {
            throw new TypeError("Passed argument was not a Monitor.");
        }

        this._monitor = value;
    }
}

let mixins = createMixins();
let computerQualityMixin = mixins.computerQualityMixin;
let styleMixin = mixins.styleMixin;

computerQualityMixin(Desktop);
styleMixin(Desktop);
computerQualityMixin(Laptop);
styleMixin(Laptop);

let keyboard = new Keyboard('Logitech', 70);
let keyboard2 = new Keyboard('A-4', 70);
let monitor = new Monitor('Logitech', 28, 18);
let battery = new Battery('Energy', 3);
let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 2.99, "Silver", battery);
let laptop2 = new Laptop("Hewlett Packard", 2.4, 4, 12, 2.99, "Silver", battery);
let desktop = new Desktop("Logitech", 3.3, 8, 1, keyboard, monitor);
let desktop2 = new Desktop("Logitech", 1.3, 8, 10, keyboard2, monitor);

console.log(desktop.isFullSet());
console.log(desktop2.isFullSet());

// expect(desktop.isFullSet()).to.be.true;
// expect(desktop2.isFullSet()).to.be.false;