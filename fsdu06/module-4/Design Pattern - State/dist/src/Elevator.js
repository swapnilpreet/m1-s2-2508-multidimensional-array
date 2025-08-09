"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elevator = void 0;
const Direction_1 = require("./Direction");
const CloseDoorStateImpl_1 = require("./elevatorStates/CloseDoorStateImpl");
class Elevator {
    constructor() {
        this.requestQueue = [];
        this.isProcessing = false;
        this.currentFloor = 1;
        this.direction = Direction_1.Direction.IDLE;
        this.capacity = 0;
        this.doorOpen = false;
        this.state = new CloseDoorStateImpl_1.CloseDoorStateImpl();
    }
    enqueueFloor(floor) {
        if (!this.requestQueue.includes(floor)) {
            this.requestQueue.push(floor);
            this.processQueue();
        }
    }
    processQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isProcessing)
                return;
            this.isProcessing = true;
            while (this.requestQueue.length > 0) {
                const next = this.requestQueue.shift();
                if (next) {
                    const floor = next;
                    this.state.moveToFloor(this, floor);
                    this.openDoor();
                    yield new Promise(res => setTimeout(res, 2000));
                    this.closeDoor();
                }
            }
            this.isProcessing = false;
            this.direction = Direction_1.Direction.IDLE;
        });
    }
    moveToFloor(floor) {
        this.state.moveToFloor(this, floor);
    }
    openDoor() {
        this.state.openDoor(this);
    }
    closeDoor() {
        this.state.closeDoor(this);
    }
    updateDisplay() {
        console.log(`Current floor is ${this.currentFloor}, Direction: ${this.direction}`);
    }
}
exports.Elevator = Elevator;
