"use strict";
class BeverageKEY {
}
class Espresso extends BeverageKEY {
    getDescription() {
        return "Espresso";
    }
    getCost() {
        return 80;
    }
}
class LemonTea extends BeverageKEY {
    getDescription() {
        return "LemonTea";
    }
    getCost() {
        return 40;
    }
}
class BeverageDecoratorKEY extends BeverageKEY {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
}
class SugarKEY extends BeverageDecoratorKEY {
    getDescription() {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost() {
        return this.beverage.getCost() + 10;
    }
}
class HoneyKEY extends BeverageDecoratorKEY {
    getDescription() {
        return this.beverage.getDescription() + " + Honey";
    }
    getCost() {
        return this.beverage.getCost() + 20;
    }
}
class WhippedCreamKEY extends BeverageDecoratorKEY {
    getDescription() {
        return this.beverage.getDescription() + " + WhippedCream";
    }
    getCost() {
        return this.beverage.getCost() + 15;
    }
}
const order1 = new HoneyKEY(new WhippedCreamKEY(new Espresso()));
const order2 = new SugarKEY(new SugarKEY(new LemonTea()));
console.log("Order 1:", order1.getDescription());
console.log("Order 2:", order2.getDescription());
console.log("Cost 1: ₹", order1.getCost());
console.log("Cost 2: ₹", order2.getCost());
