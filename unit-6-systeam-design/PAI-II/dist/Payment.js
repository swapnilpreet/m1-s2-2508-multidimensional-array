"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalWalletPayment = exports.CreditCardPayment = void 0;
class CreditCardPayment {
    constructor(cardnumber) {
        this.cardnumber = cardnumber;
    }
    pay(amount) {
        console.log(`payment processing card payment Rs.${amount} using card ${this.cardnumber}`);
        return true;
    }
}
exports.CreditCardPayment = CreditCardPayment;
class DigitalWalletPayment {
    constructor(DigitalpayID) {
        this.DigitalpayID = DigitalpayID;
    }
    pay(amount) {
        console.log(`payment processing using Digital Wallet Rs. ${amount} using wallet ID ${this.DigitalpayID}`);
        return true;
    }
}
exports.DigitalWalletPayment = DigitalWalletPayment;
