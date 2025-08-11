"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IHotelProviderFactory_1 = require("./IHotelProviderFactory");
function main(factory) {
    let newbooking = factory.createBook();
    let newitinarary = factory.createItinerary();
    let newinvoice = factory.createInvoice();
    console.log(newbooking.book(), newinvoice.generate(), newitinarary.display());
}
main(new IHotelProviderFactory_1.HotelProviderFactory());
// main(new FlightProviderFacotry())
