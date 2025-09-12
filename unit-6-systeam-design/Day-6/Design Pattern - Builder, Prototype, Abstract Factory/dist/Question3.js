"use strict";
class Car {
    constructor(brand, engine, color, sunroof, automaticTransmission) {
        this.brand = brand;
        this.engine = engine;
        this.color = color;
        this.sunroof = sunroof;
        this.automaticTransmission = automaticTransmission;
        Object.freeze(this);
    }
    describe() {
        return `${this.brand} with ${this.engine} engine, ${this.color} color, ${this.sunroof ? "sunroof" : "no sunroof"}, and ${this.automaticTransmission ? "automatic" : "manual"} transmission.`;
    }
}
class CarBuilder {
    constructor() {
        this._brand = "Unknown";
        this._engine = "Petrol";
        this._color = "White";
        this._sunroof = false;
        this._automaticTransmission = false;
    }
    setBrand(brand) {
        this._brand = brand;
        return this;
    }
    setEngine(engine) {
        this._engine = engine;
        return this;
    }
    setColor(color) {
        this._color = color;
        return this;
    }
    addSunroof() {
        this._sunroof = true;
        return this;
    }
    enableAutomaticTransmission() {
        this._automaticTransmission = true;
        return this;
    }
    build() {
        return new Car(this._brand, this._engine, this._color, this._sunroof, this._automaticTransmission);
    }
}
function main3() {
    const teslaModelS = new CarBuilder()
        .setBrand("Tesla Model S")
        .setEngine("electric")
        .setColor("black")
        .addSunroof()
        .enableAutomaticTransmission()
        .build();
    console.log(teslaModelS.describe());
    console.log(JSON.stringify(teslaModelS, null, 2));
}
main3();
