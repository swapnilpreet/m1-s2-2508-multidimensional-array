"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProcessor = void 0;
class PaymentProcessor {
    constructor() {
        this.strategy = null;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    processPayment(details, amount) {
        if (!this.strategy) {
            console.log("No payment strategy selected");
            return;
        }
        const isValid = this.strategy.validateDetails(details);
        if (isValid) {
            this.strategy.pay(amount);
        }
        else {
            console.log("payment failed due to invalid details");
        }
    }
}
exports.PaymentProcessor = PaymentProcessor;
