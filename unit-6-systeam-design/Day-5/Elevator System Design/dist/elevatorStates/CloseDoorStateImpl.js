"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseDoorStateImpl = void 0;
const Direction_1 = require("../Direction");
const MovingStateImpl_1 = require("./MovingStateImpl");
const OpenDoorStateImpl_1 = require("./OpenDoorStateImpl");
class CloseDoorStateImpl {
    moveToFloor(elevator, floor) {
        elevator.direction = elevator.currentFloor > floor ? Direction_1.Direction.DOWN : Direction_1.Direction.UP;
        elevator.state = new MovingStateImpl_1.MovingStateImpl();
        let distance = Math.abs(floor - elevator.currentFloor);
        let step = elevator.currentFloor < floor ? 1 : -1;
        for (let i = 1; i <= distance; i++) {
            elevator.currentFloor += step;
            console.log(`Elevator at floor : ${elevator.currentFloor}`);
            if (elevator.currentFloor === floor) {
                console.log(`Elevator has arrived at floor ${floor}`);
                elevator.state = new CloseDoorStateImpl();
                elevator.updateDisplay();
            }
        }
    }
    openDoor(elevator) {
        console.log(`Elevator door is opening....`);
        elevator.doorOpen = true;
        elevator.state = new OpenDoorStateImpl_1.OpenDoorStateImpl();
    }
    closeDoor(elevator) {
        console.log(`Elevator Door is closed`);
        elevator.doorOpen = false;
    }
}
exports.CloseDoorStateImpl = CloseDoorStateImpl;
