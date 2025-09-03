"use strict";
class PetrolEngine {
    start() {
        console.log("Petrol engine started");
    }
}
class DieselEngine {
    start() {
        console.log("Diesel engine started");
    }
}
class NEwCar {
    constructor(engine) {
        this.engine = engine;
    }
    drive() {
        this.engine.start();
        console.log("Driving car");
    }
}
const petrolCar = new NEwCar(new PetrolEngine());
petrolCar.drive();
const dieselCar = new NEwCar(new DieselEngine());
dieselCar.drive();
