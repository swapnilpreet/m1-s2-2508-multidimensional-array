"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenDoorStateImpl = void 0;
const CloseDoorStateImpl_1 = require("./CloseDoorStateImpl");
class OpenDoorStateImpl {
    moveToFloor(elevator, floor) {
        console.log("Cannot move elevator while doors are open");
    }
    openDoor(elevator) {
        console.log("Doors are already open!");
    }
    closeDoor(elevator) {
        console.log("Doors are closing...");
        elevator.doorOpen = false;
        elevator.state = new CloseDoorStateImpl_1.CloseDoorStateImpl();
    }
}
exports.OpenDoorStateImpl = OpenDoorStateImpl;
