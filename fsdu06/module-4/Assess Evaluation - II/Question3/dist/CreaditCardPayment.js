"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreaditCardPayment = void 0;
class CreaditCardPayment {
    validateDetails(details) {
        let { carNumber, expiryDate, cvv } = details;
        let isValid = !carNumber && !expiryDate && !cvv;
        if (isValid) {
            this.details = details;
        }
        else {
            console.log("creadit card validation failed , missing details");
        }
        return isValid;
    }
    pay(amount) {
        let processfees = amount * 1.5 / 100;
        let fees = amount - processfees;
        let totalamount = amount + fees;
        console.log("paid amount is", totalamount, "with creadit card");
    }
}
exports.CreaditCardPayment = CreaditCardPayment;
