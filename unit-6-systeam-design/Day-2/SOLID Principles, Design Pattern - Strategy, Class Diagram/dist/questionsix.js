"use strict";
class CardPayment {
    pay(amount) {
        console.log(`Paid ${amount} using Card`);
    }
}
class UPIPayment {
    pay(amount) {
        console.log(`Paid ${amount} using UPI`);
    }
}
class BitcoinPayment {
    pay(amount) {
        console.log(`Paid ${amount} using Bitcoin`);
    }
}
class Payment {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    process(amount) {
        this.strategy.pay(amount);
    }
}
const payment = new Payment(new CardPayment());
payment.process(1000);
payment.setStrategy(new BitcoinPayment());
payment.process(2000);
