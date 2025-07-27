"use strict";
// 2. Concrete Strategies
class CardPayment {
    pay(amount) {
        console.log(`Paid ₹${amount} using Card`);
    }
}
class UPIPayment {
    pay(amount) {
        console.log(`Paid ₹${amount} using UPI`);
    }
}
class BitcoinPayment {
    pay(amount) {
        console.log(`Paid ₹${amount} using Bitcoin`);
    }
}
// 3. Payment Context Class
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
// 4. Test the behavior
const payment = new Payment(new CardPayment());
payment.process(1000); // Output: Paid ₹1000 using Card
payment.setStrategy(new UPIPayment());
payment.process(1500); // Output: Paid ₹1500 using UPI
payment.setStrategy(new BitcoinPayment());
payment.process(2000); // Output: Paid ₹2000 using Bitcoin
