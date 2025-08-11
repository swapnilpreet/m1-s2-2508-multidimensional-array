import { IBooking } from "./IBooking";
import { IInvoice } from "./IInvoice";
import { Itinerary } from "./IItinerary";



export interface IBookingProviderFacotory{
    createBook():IBooking;
    createItinerary():Itinerary;
    createInvoice():IInvoice;
}
