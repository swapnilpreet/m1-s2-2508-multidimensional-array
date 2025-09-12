import e from "express";
import { ClosestElevatorSelector } from "./ClosestElevatorSelector";
import { Elevator } from "./Elevator";
import { ElevatorRequest } from "./ElevatorRequest";
import { IElevatorSelector } from "./IElevatorSelector";


export class ElevatorManager{
    // best elevator
    numFloors : number;
    elevators: Elevator[];
    selector: IElevatorSelector;

    constructor(numFloors: number, numElevators: number){
        this.numFloors = numFloors;
        this.selector = new ClosestElevatorSelector();
        this.elevators = [];

        for(let i=0; i<numElevators; i++){
            this.elevators.push(new Elevator());
        }
    }

    updateDisplay(): void{
        for(const elevator of this.elevators){
            elevator.updateDisplay();
        }
    }

    requestElevator(request: ElevatorRequest): Elevator | null{
        const elevator = this.selector.selectElevator(this.elevators, request);

        if(elevator){
            // pick up
            elevator.enqueueFloor(request.currentFloor);

            // drop off
            elevator.enqueueFloor(request.destinationFloor);
        } else {
            console.log(`No elevator is available`);
        }

        return elevator;
    }
}