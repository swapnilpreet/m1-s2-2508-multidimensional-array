"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelProviderFactory = void 0;
const IHotelBooking_1 = require("./IHotelBooking");
const IHotelInvoice_1 = require("./IHotelInvoice");
const IHotelItinerary_1 = require("./IHotelItinerary");
class HotelProviderFactory {
    createBook() {
        return new IHotelBooking_1.HotelBooking();
    }
    createInvoice() {
        return new IHotelItinerary_1.HotelInvoice();
    }
    createItinerary() {
        return new IHotelInvoice_1.HotelItinaray();
    }
}
exports.HotelProviderFactory = HotelProviderFactory;
