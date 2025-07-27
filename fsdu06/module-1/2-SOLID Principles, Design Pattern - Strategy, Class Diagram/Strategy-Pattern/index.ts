
interface PaymentStrategy {
    pay(amount: number): void;
}
 
class CardPayment implements PaymentStrategy {
    public pay(amount: number): void {
        console.log(`Paid ₹${amount} using Card`);
    }
}

class UPIPayment implements PaymentStrategy {
    public pay(amount: number): void {
        console.log(`Paid ₹${amount} using UPI`);
    }
}

class BitcoinPayment implements PaymentStrategy {
    public pay(amount: number): void {
        console.log(`Paid ₹${amount} using Bitcoin`);
    }
}
 
class Payment {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }

    public process(amount: number): void {
        this.strategy.pay(amount);
    }
}

const payment = new Payment(new CardPayment());
payment.process(1000);

payment.setStrategy(new UPIPayment());
payment.process(1500);

payment.setStrategy(new BitcoinPayment());
payment.process(2000);









class Animal {
    public makeSound(): void {
        console.log("Some sound");
    }
}

class Dog extends Animal {
    public makeSound(): void {
        console.log("Bark!");
    }
}

function makeAnimalSound(animal: Animal): void {
    animal.makeSound();
}
 
const genericAnimal: Animal = new Animal();
const dog: Animal = new Dog();

makeAnimalSound(genericAnimal)
makeAnimalSound(dog);