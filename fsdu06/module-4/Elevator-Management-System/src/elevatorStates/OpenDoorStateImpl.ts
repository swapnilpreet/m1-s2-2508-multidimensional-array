import { Elevator } from "../Elevator";
import { IElevatorState } from "../IElevatorState";
import { CloseDoorStateImpl } from "./CloseDoorStateImpl";

export class OpenDoorStateImpl implements IElevatorState{
    moveToFloor(elevator: Elevator, floor: number): void {
        console.log("Cannot move elevator while doors are open");
    }
    openDoor(elevator: Elevator): void {
        console.log("Doors are already open!");
    }
    closeDoor(elevator: Elevator): void {
        console.log("Doors are closing...");
        elevator.doorOpen = false;
        elevator.state = new CloseDoorStateImpl();
    }

}