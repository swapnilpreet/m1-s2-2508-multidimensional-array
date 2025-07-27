"use strict";
class StandardShipping {
    calculate() {
        return 50;
    }
}
class ExpressShipping {
    calculate() {
        return 100;
    }
}
class Shipping {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    calculateCost() {
        return this.strategy.calculate();
    }
}
const shipping = new Shipping(new StandardShipping());
console.log("Standard Shipping:", shipping.calculateCost());
shipping.setStrategy(new ExpressShipping());
console.log("Express Shipping:", shipping.calculateCost());
