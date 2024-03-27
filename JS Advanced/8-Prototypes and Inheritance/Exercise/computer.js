function createComputerPeripheryClasses() {

    class Base {
        constructor(manufacturer) {
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Base {
        constructor(manufacturer, responseTime) {
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }

    class Monitor extends Base {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends Base {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    // Abstract class
    class Computer extends Base {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error('Cannot initiate Computer directly!');
            }
            super(manufacturer);
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer {
        #battery;

        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;


            if (battery.constructor.name !== 'Battery') {
                throw new TypeError('Passed object  is not of the expected instance! The expected instance is Battery!');
            }
            this.#battery = battery;
        }

        get battery() {
            return this.#battery;
        }

        set battery(batteryInstance) {
            if (batteryInstance.constructor.name !== 'Battery') {
                throw new TypeError('Passed object  is not of the expected instance! The expected instance is Battery!');
            }
            this.#battery = batteryInstance;
        }
    }

    class Desktop extends Computer {
        #keyboard;
        #monitor;
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            // this.#keyboard = keyboard;
            // this.#monitor = monitor;

            if (keyboard.constructor.name !== 'Keyboard') {
                throw new TypeError('Passed object  is not of the expected instance! The expected instance is Keyboard!');
            }
            this.#keyboard = keyboard;

            if (monitor.constructor.name !== 'Monitor') {
                throw new TypeError('Passed object  is not of the expected instance! The expected instance is Monitor!');
            }
            this.#monitor = monitor;
        }

        get keyboard() {
            return this.#keyboard;
        }

        set keyboard(keyboardInstance) {
            if (keyboardInstance.constructor.name !== 'Keyboard') {
                throw new TypeError('Passed object  is not of the expected instance! The expected instance is Battery!');
            }
            this.#keyboard = keyboardInstance;
        }

        get monitor() {
            return this.#monitor;
        }

        set monitor(monitorInstance) {
            if (monitorInstance.constructor.name !== 'Monitor') {
                throw new TypeError('Passed object  is not of the expected instance! The expected instance is Battery!');
            }
            this.#monitor = monitorInstance;
        }
    }


    return {
        Keyboard,
        Monitor,
        Battery,
        Computer,
        Laptop,
        Desktop
    }
}

// Test

let classes = createComputerPeripheryClasses();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;


let test = new Computer("Most Computers",2,8,1.5);
// expect(()=>).to.throw(Error);

let keyboard = new Keyboard('Logitech',70);
let monitor = new Monitor('Benq',28,18);
let battery = new Battery('Energy',3);
let laptop = new Laptop("Hewlett Packard",2.4,4,0.5,3.12,"Silver",battery);
let desktop = new Desktop("JAR Computers",3.3,8,1,keyboard,monitor);

expect(()=>laptop.battery = "pesho").to.throw(TypeError);
expect(()=>desktop.keyboard = "gosho").to.throw(TypeError);
expect(()=>desktop.monitor = "stamat").to.throw(TypeError);

keyboard.manufacturer = "Ha";
// expect(desktop.keyboard.manufacturer).to.equal('Ha',"Keyboard getter did not work.");
monitor.manufacturer = "Ho";
// expect(desktop.monitor.manufacturer).to.equal('Ho',"Keyboard getter did not work.");
battery.manufacturer = "Hi";
// expect(laptop.battery.manufacturer).to.equal('Hi',"Keyboard getter did not work.");