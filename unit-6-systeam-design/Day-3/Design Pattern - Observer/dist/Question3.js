"use strict";
class NEWBeverage {
}
class NewGreenTea extends NEWBeverage {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
class BDecorator extends NEWBeverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
}
class NEWSugar extends BDecorator {
    getDescription() {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost() {
        return this.beverage.getCost() + 10;
    }
}
const Newtea = new NEWSugar(new NEWSugar(new NewGreenTea()));
console.log(Newtea.getDescription());
console.log(Newtea.getCost());
