"use strict";
class Bike {
    constructor(name) {
        this.name = name;
    }
    getDetails() {
        return `Bike: ${this.name}`;
    }
}
class Car {
    constructor(name) {
        this.name = name;
    }
    getDetails() {
        return `Car: ${this.name}`;
    }
}
class VehicleFactory {
    static createVehicle(type, name) {
        switch (type) {
            case "Bike":
                return new Bike(name);
            case "Car":
                return new Car(name);
            default:
                throw new Error("Unknown vehicle type");
        }
    }
}
let myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
let myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myBike.getDetails());
console.log(myCar.getDetails());
