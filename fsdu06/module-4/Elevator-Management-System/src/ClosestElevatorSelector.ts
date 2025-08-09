import { Direction } from "./Direction";
import { Elevator } from "./Elevator";
import { ElevatorRequest } from "./ElevatorRequest";
import { IElevatorSelector } from "./IElevatorSelector";

export class ClosestElevatorSelector implements IElevatorSelector{
    selectElevator(elevators: Elevator[], request: ElevatorRequest): Elevator | null {
       
        let bestElevator: Elevator | null = null;
        let minDistance = Infinity;

        for( const elevator of elevators){
            const distance = Math.abs(elevator.currentFloor - request.currentFloor);

            if (elevator.direction === request.direction || elevator.direction === Direction.IDLE){
                if(distance < minDistance){
                    minDistance = distance;
                    bestElevator = elevator;
                }
            }
        }

        return bestElevator;
    }

}