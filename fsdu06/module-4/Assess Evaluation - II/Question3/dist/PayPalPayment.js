"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalPayment = void 0;
class PaypalPayment {
    validateDetails(details) {
        let { email } = details;
        let isvalid = !email && email.includes("@");
        if (isvalid) {
            this.details = details;
        }
        else {
            console.log("Paypal payment validation failed");
        }
        return isvalid;
    }
    pay(amount) {
        let processingfees = amount * 2.5 / 100;
        let fees = amount - processingfees;
        console.log("paid amount is ", fees, " with paypal payment method");
    }
}
exports.PaypalPayment = PaypalPayment;
