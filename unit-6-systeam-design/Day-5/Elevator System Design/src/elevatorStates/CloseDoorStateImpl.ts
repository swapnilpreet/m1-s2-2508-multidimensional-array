import { Direction } from "../Direction";
import { Elevator } from "../Elevator";
import { IElevatorState } from "../IElevatorState";
import { MovingStateImpl } from "./MovingStateImpl";
import { OpenDoorStateImpl } from "./OpenDoorStateImpl";


export class CloseDoorStateImpl implements IElevatorState{
    moveToFloor(elevator: Elevator, floor: number): void {
        elevator.direction = elevator.currentFloor > floor ? Direction.DOWN : Direction.UP;

        elevator.state = new MovingStateImpl();

        let distance = Math.abs(floor - elevator.currentFloor);
        let step = elevator.currentFloor < floor ? 1 : -1;

        for(let i=1; i<=distance; i++){
            elevator.currentFloor += step;
            console.log(`Elevator at floor : ${elevator.currentFloor}`);

            if(elevator.currentFloor === floor){
                console.log(`Elevator has arrived at floor ${floor}`);
                elevator.state = new CloseDoorStateImpl();
                elevator.updateDisplay();
            }
        }
    }
    openDoor(elevator: Elevator): void {
        console.log(`Elevator door is opening....`);
        elevator.doorOpen = true;
        elevator.state = new OpenDoorStateImpl();
    }
    closeDoor(elevator: Elevator): void {
        console.log(`Elevator Door is closed`);
        elevator.doorOpen = false;
    }
}