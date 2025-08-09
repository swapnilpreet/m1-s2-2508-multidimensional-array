"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingStateImpl = void 0;
class MovingStateImpl {
    moveToFloor(elevator, floor) {
        console.log(`Elevator is already moving`);
    }
    openDoor(elevator) {
        console.log(`Cannot open the door while moving`);
    }
    closeDoor(elevator) {
        console.log(`Doors are already closed`);
    }
}
exports.MovingStateImpl = MovingStateImpl;
