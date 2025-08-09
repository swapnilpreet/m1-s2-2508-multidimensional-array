"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElevatorManager_1 = require("./ElevatorManager");
const ElevatorRequest_1 = require("./ElevatorRequest");
const elevatorManager = new ElevatorManager_1.ElevatorManager(50, 4);
const request1 = new ElevatorRequest_1.ElevatorRequest(30, 1);
const elevator1 = elevatorManager.requestElevator(request1);
