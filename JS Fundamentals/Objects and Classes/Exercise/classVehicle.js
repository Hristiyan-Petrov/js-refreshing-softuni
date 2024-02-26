class Vehicle {
    constructor(type, model, parts, fuel) {
        this.type = type;
        this.model = model;
        this.parts = parts; // will be object {engine, power, quality}
        this.parts.quality = this.parts.engine * this.parts.power;
        this.fuel = fuel;
    }

    //a function that receives fuel loss and decreases the fuel of the vehicle by that number
    drive(fuelLoss) {
        this.fuel -= fuelLoss;
    };
}

let parts = {engine: 9, power: 500};
let vehicle = new Vehicle('l', 'k', parts, 840);
vehicle.drive(20);
console.log(vehicle.fuel);
