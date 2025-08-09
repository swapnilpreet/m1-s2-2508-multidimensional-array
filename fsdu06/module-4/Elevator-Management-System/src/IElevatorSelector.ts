import { Elevator } from "./Elevator";
import { ElevatorRequest } from "./ElevatorRequest";

export interface IElevatorSelector{
    selectElevator(elevator: Elevator[], request: ElevatorRequest): Elevator | null;
}