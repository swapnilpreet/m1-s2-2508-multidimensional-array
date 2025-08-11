import { IBooking } from "./IBooking";


export class HotelBooking implements IBooking{
    book(): string {
        return "Hotel booked at Marriott,"
    }
}