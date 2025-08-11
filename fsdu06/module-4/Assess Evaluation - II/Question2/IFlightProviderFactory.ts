import { IBooking } from "./IBooking";
import { IBookingProviderFacotory } from "./IBookingProviderFacotory";
import { FlightBooking } from "./IFlightBooking";
import { FlightInvoice } from "./IFlightInvoice";
import { FlightItinerary } from "./IFlightItinerary";
import { IInvoice } from "./IInvoice";
import { Itinerary } from "./IItinerary";



export class FlightProviderFacotry implements IBookingProviderFacotory{
    createBook(): IBooking {
        return new FlightBooking();
    }

    createInvoice(): IInvoice {
        return new FlightInvoice()
    }

    createItinerary(): Itinerary {
        return new FlightItinerary();
    }
}

