"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightProviderFacotry = void 0;
const IFlightBooking_1 = require("./IFlightBooking");
const IFlightInvoice_1 = require("./IFlightInvoice");
const IFlightItinerary_1 = require("./IFlightItinerary");
class FlightProviderFacotry {
    createBook() {
        return new IFlightBooking_1.FlightBooking();
    }
    createInvoice() {
        return new IFlightInvoice_1.FlightInvoice();
    }
    createItinerary() {
        return new IFlightItinerary_1.FlightItinerary();
    }
}
exports.FlightProviderFacotry = FlightProviderFacotry;
