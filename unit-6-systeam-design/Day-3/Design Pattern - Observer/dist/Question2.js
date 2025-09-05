"use strict";
class AbstractBeverage {
}
class ConcreteGreenTea extends AbstractBeverage {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
class BeverageDecorator extends AbstractBeverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
}
class Sugar extends BeverageDecorator {
    getDescription() {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost() {
        return this.beverage.getCost() + 10;
    }
}
const newtea = new Sugar(new ConcreteGreenTea());
console.log(newtea.getDescription());
console.log(newtea.getCost());
