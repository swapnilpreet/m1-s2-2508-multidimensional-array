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
        if (type === "Bike") {
            return new Bike(name);
        }
        else if (type === "Car") {
            return new Car(name);
        }
        else {
            throw new Error("Invalid vehicle type");
        }
    }
}
const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails());
const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails());
