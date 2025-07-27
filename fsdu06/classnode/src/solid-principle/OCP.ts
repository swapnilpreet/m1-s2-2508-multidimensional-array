// bad problem OCP

class PaymentProcessor {
  processPayment(method: string, amount: number): void {
    if (method === "paypal") {
      console.log(`Paid ${amount} using paypal`);
    } else if (method === "creaditCard") {
      console.log(`Paid ${amount} using creaditCard`);
    } else if (method === "upi") {
      console.log(`Paid ${amount} using upi`);
    }
  }
}

const payment = new PaymentProcessor();
payment.processPayment("paypal",500);
payment.processPayment("creaditCard",200);
payment.processPayment("upi",800)

// ❌ Problems
// If we add a new payment method (e.g., Crypto):
// We must modify processPayment() → risk of breaking existing logic.
// Violates Open/Closed Principle because:
// Closed for modification? ❌ No, we keep editing existing class.
// Open for extension? ❌ No, we rely on if/else.


// how we solve above problem using OCP 
// step by step
// 1 => Define Payment Strategy Interface
// 2 => Implement Concrete Strategies
// 3 => Create Context Class (Closed for Modification)
// 4 => Usage

interface PaymentStrategy{
    pay(amount:number):void;
}


class PayPalPayment implements PaymentStrategy{
    pay(amount:number):void{
        console.log(`paid ${amount} using Paypal`);
    }
}

class CreditCardPayment implements PaymentStrategy{
    pay(amount:number):void{
        console.log(`paid ${amount} using Creadit `);
    }
}

class UpiPayment implements PaymentStrategy{
    pay(amount: number): void {
        console.log(`paid ${amount} using upi`);
        
    }
}


class OCPPaymentProcessor{
    constructor(private paymentStrategory:PaymentStrategy){};

    process(amount:number):void{
        this.paymentStrategory.pay(amount)
    }
}
class CryptoPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Cryptocurrency`);
  }
}

// ✅ Use new strategy without modifying PaymentProcessor
const cryptoProcessor = new OCPPaymentProcessor(new CryptoPayment());
cryptoProcessor.process(1500); // Paid ₹1500 using Cryptocurrency

const paypalProcessor = new OCPPaymentProcessor(new PayPalPayment());
paypalProcessor.process(500); // Paid ₹500 using PayPal

const creditCardProcessor = new OCPPaymentProcessor(new CreditCardPayment());
creditCardProcessor.process(1000); // Paid ₹1000 using Credit Card

const upiProcessor = new OCPPaymentProcessor(new UpiPayment());
upiProcessor.process(200); // Paid ₹200 using UPI

// ✅ Why This Follows OCP
// ✔ PaymentProcessor is closed for modification – no code changes needed when adding new methods.
// ✔ We extend behavior by creating new classes → open for extension.
// ✔ Eliminates if/else mess → clean, maintainable, and scalable.

