"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDisplay = void 0;
class CustomerDisplay {
    constructor(name) {
        this.name = name;
    }
    update(orderid, newState) {
        if (newState === "Ready") {
            console.log(`Display: ${this.name} OrderId ${orderid} is ready`);
        }
        else {
            console.log(`Display ${this.name} OrderId : ${orderid} changedState ${newState}`);
        }
    }
}
exports.CustomerDisplay = CustomerDisplay;
