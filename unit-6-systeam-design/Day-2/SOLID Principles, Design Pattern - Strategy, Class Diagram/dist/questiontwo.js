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
    calculateCost() {
        return this.strategy.calculate();
    }
}
const newstandard = new Shipping(new StandardShipping());
console.log(newstandard.calculateCost());
const newexpress = new Shipping(new ExpressShipping());
console.log(newexpress.calculateCost());
