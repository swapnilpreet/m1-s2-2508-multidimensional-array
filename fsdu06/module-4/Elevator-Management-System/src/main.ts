import { ElevatorManager } from "./ElevatorManager";
import { ElevatorRequest } from "./ElevatorRequest";

const elevatorManager = new ElevatorManager(50, 4);
const request1 = new ElevatorRequest(30, 1);
const elevator1 = elevatorManager.requestElevator(request1);