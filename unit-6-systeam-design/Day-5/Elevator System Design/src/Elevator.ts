
import { Direction } from "./Direction";
import {CloseDoorStateImpl } from "./elevatorStates/CloseDoorStateImpl";
import { IElevatorState } from "./IElevatorState";

export class Elevator{
    currentFloor: number;
    direction: Direction;
    capacity: number;
    state: IElevatorState;
    doorOpen: boolean;
    private requestQueue: number[] = [];
    private isProcessing: boolean = false;

    constructor(){
        this.currentFloor = 1;
        this.direction = Direction.IDLE;
        this.capacity = 0;
        this.doorOpen = false;
        this.state = new CloseDoorStateImpl();
    }

    enqueueFloor(floor:number){
       if(!this.requestQueue.includes(floor)){
            this.requestQueue.push(floor);
            this.processQueue();
       }
    }

    private async processQueue():Promise<void>{
        if(this.isProcessing)
            return;

        this.isProcessing = true;
        while(this.requestQueue.length > 0){
            const next = this.requestQueue.shift();
            if(next){
                const floor = next;
                this.state.moveToFloor(this, floor);
                this.openDoor();
                await new Promise( res => setTimeout(res, 2000));
                this.closeDoor();
            }
        }

        this.isProcessing = false;
        this.direction = Direction.IDLE;
    }


    moveToFloor(floor:number):void{
        this.state.moveToFloor(this, floor);
    }

    openDoor():void{
        this.state.openDoor(this);
    }

    closeDoor():void{
        this.state.closeDoor(this);
    }

    updateDisplay():void{
        console.log(`Current floor is ${this.currentFloor}, Direction: ${this.direction}`);
    }
}