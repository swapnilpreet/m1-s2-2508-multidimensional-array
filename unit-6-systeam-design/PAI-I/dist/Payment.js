"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalWalletPayment = exports.CreditCardPayment = void 0;
class CreditCardPayment {
    constructor(cardNumber) {
        this.cardNumber = cardNumber;
    }
    pay(amount) {
        console.log(`Processing credit card payment of ${amount} using card ${this.cardNumber}`);
        return true;
    }
}
exports.CreditCardPayment = CreditCardPayment;
class DigitalWalletPayment {
    constructor(walletId) {
        this.walletId = walletId;
    }
    pay(amount) {
        console.log(`Processing wallet payment of ${amount} using wallet ${this.walletId}`);
        return true;
    }
}
exports.DigitalWalletPayment = DigitalWalletPayment;
