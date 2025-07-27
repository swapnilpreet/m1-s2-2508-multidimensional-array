"use strict";
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
payment.setStrategy(new UPIPayment());
payment.process(1500);
payment.setStrategy(new BitcoinPayment());
payment.process(2000);
class Animal {
    makeSound() {
        console.log("Some sound");
    }
}
class Dog extends Animal {
    makeSound() {
        console.log("Bark!");
    }
}
function makeAnimalSound(animal) {
    animal.makeSound();
}
const genericAnimal = new Animal();
const dog = new Dog();
makeAnimalSound(genericAnimal);
makeAnimalSound(dog);
