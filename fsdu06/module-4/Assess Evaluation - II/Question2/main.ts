import { IBookingProviderFacotory } from "./IBookingProviderFacotory";
import { FlightProviderFacotry } from "./IFlightProviderFactory";
import { HotelProviderFactory } from "./IHotelProviderFactory";





function main(factory:IBookingProviderFacotory){
    let newbooking=factory.createBook();
    let newitinarary=factory.createItinerary();
    let newinvoice=factory.createInvoice();
    console.log(newbooking.book(),newinvoice.generate(),newitinarary.display())
}
main(new HotelProviderFactory())
main(new FlightProviderFacotry())