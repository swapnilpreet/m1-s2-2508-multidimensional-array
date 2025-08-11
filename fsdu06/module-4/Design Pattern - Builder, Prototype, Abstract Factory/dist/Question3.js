"use strict";
class Car {
    constructor(brand, engine, color, sunroof, automatictransmission) {
        this.brand = brand;
        this.engine = engine;
        this.color = color;
        this.sunroof = sunroof;
        this.automatictransmission = automatictransmission;
    }
    getDetails() {
        return `Your Car Details brand:${this.brand} with an ${this.engine} engine, ${this.color} color, Sunroof: ${this.sunroof ? "Yes" : "No"} and Automatic transmission ${this.automatictransmission ? "Yes " : "No"}`;
    }
}
class CarBuilder {
    constructor() {
        this.brand = "Nexa";
        this.engine = "petrol engine";
        this.color = "red color";
        this.sunroof = false;
        this.automatictransmission = false;
    }
    setbrand(brand) {
        this.brand = brand;
        return this;
    }
    setEngine(engine) {
        this.engine = engine;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    setSunroof() {
        this.sunroof = true;
        return this;
    }
    setAutomatic() {
        this.automatictransmission = true;
        return this;
    }
    build() {
        return new Car(this.brand, this.engine, this.color, this.sunroof, this.automatictransmission);
    }
}
function main3() {
    let newCar = new CarBuilder()
        .setbrand("Tesla")
        .setEngine("electric")
        .setColor('red')
        .setSunroof()
        .setAutomatic()
        .build();
    console.log(newCar.getDetails());
}
main3();
