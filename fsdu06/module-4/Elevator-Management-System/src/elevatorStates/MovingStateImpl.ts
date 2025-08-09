import { Elevator } from "../Elevator";
import { IElevatorState } from "../IElevatorState";

export class MovingStateImpl implements IElevatorState{
    moveToFloor(elevator: Elevator, floor: number): void {
        console.log(`Elevator is already moving`);
    }
    openDoor(elevator: Elevator): void {
        console.log(`Cannot open the door while moving`);
    }
    closeDoor(elevator: Elevator): void {
        console.log(`Doors are already closed`);
    }
}