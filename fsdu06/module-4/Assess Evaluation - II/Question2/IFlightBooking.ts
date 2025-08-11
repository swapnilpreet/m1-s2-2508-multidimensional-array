import { IBooking } from "./IBooking";


export class FlightBooking implements IBooking{
    book(): string {
        return "Flight booked with Indigo,"
    }
}
