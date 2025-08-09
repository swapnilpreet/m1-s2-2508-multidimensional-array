"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClosestElevatorSelector = void 0;
const Direction_1 = require("./Direction");
class ClosestElevatorSelector {
    selectElevator(elevators, request) {
        let bestElevator = null;
        let minDistance = Infinity;
        for (const elevator of elevators) {
            const distance = Math.abs(elevator.currentFloor - request.currentFloor);
            if (elevator.direction === request.direction || elevator.direction === Direction_1.Direction.IDLE) {
                if (distance < minDistance) {
                    minDistance = distance;
                    bestElevator = elevator;
                }
            }
        }
        return bestElevator;
    }
}
exports.ClosestElevatorSelector = ClosestElevatorSelector;
