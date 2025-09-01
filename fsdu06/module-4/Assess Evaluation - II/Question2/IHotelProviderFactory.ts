import { IBooking } from "./IBooking";
import { IBookingProviderFacotory } from "./IBookingProviderFacotory";
import { HotelBooking } from "./IHotelBooking";
import { HotelItinaray } from "./IHotelInvoice";
import { HotelInvoice } from "./IHotelItinerary";
import { IInvoice } from "./IInvoice";
import { Itinerary } from "./IItinerary";



export class HotelProviderFactory implements IBookingProviderFacotory{
    createBook(): IBooking {
        return new HotelBooking();
    }

    createInvoice(): IInvoice {
        return new HotelInvoice();
    }

    createItinerary(): Itinerary {
        return new HotelItinaray();
    }
} 