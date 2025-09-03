"use strict";
class NEWBike {
    start() {
        console.log("Bike is starting");
    }
}
class NEWCar {
    start() {
        console.log("Car is starting");
    }
}
class NEWDriver {
    constructor(vehicle) {
        this.vehicle = vehicle;
    }
    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
    drive() {
        this.vehicle.start();
        console.log("Driving...");
    }
}
const driver = new NEWDriver(new NEWBike());
driver.drive();
driver.setVehicle(new NEWCar());
driver.drive();
