"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorManager = void 0;
const ClosestElevatorSelector_1 = require("./ClosestElevatorSelector");
const Elevator_1 = require("./Elevator");
class ElevatorManager {
    constructor(numFloors, numElevators) {
        this.numFloors = numFloors;
        this.selector = new ClosestElevatorSelector_1.ClosestElevatorSelector();
        this.elevators = [];
        for (let i = 0; i < numElevators; i++) {
            this.elevators.push(new Elevator_1.Elevator());
        }
    }
    updateDisplay() {
        for (const elevator of this.elevators) {
            elevator.updateDisplay();
        }
    }
    requestElevator(request) {
        const elevator = this.selector.selectElevator(this.elevators, request);
        if (elevator) {
            // pick up
            elevator.enqueueFloor(request.currentFloor);
            // drop off
            elevator.enqueueFloor(request.destinationFloor);
        }
        else {
            console.log(`No elevator is available`);
        }
        return elevator;
    }
}
exports.ElevatorManager = ElevatorManager;
