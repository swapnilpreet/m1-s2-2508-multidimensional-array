"use strict";
class BeverageNEW {
}
class GreenTeaNEW extends BeverageNEW {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
class Coffee extends BeverageNEW {
    getDescription() {
        return "Coffee";
    }
    getCost() {
        return 50;
    }
}
class BeverageDecoratorNEW extends BeverageNEW {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
}
class SugarNEW extends BeverageDecoratorNEW {
    getDescription() {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost() {
        return this.beverage.getCost() + 10;
    }
}
class HoneyNEW extends BeverageDecoratorNEW {
    getDescription() {
        return this.beverage.getDescription() + " + Honey";
    }
    getCost() {
        return this.beverage.getCost() + 20;
    }
}
class WhippedCream extends BeverageDecoratorNEW {
    getDescription() {
        return this.beverage.getDescription() + " + WhippedCream";
    }
    getCost() {
        return this.beverage.getCost() + 15;
    }
}
const myDrink = new WhippedCream(new HoneyNEW(new SugarNEW(new Coffee())));
console.log(myDrink.getDescription());
console.log(myDrink.getCost());
