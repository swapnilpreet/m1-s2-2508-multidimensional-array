"use strict";
var VehicleType;
(function (VehicleType) {
    VehicleType["BIKE"] = "Bike";
    VehicleType["CAR"] = "Car";
    VehicleType["EV"] = "EV";
    VehicleType["TRUCK"] = "Truck";
})(VehicleType || (VehicleType = {}));
class Vehicle {
    constructor(number, type) {
        this.number = number;
        this.type = type;
    }
}
class ParkingSlot {
    constructor(id, isAvailable, isEVOnly = false) {
        this.id = id;
        this.isAvailable = isAvailable;
        this.isEVOnly = isEVOnly;
    }
}
