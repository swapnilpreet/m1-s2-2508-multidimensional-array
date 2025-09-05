"use strict";
class BeverageNew {
}
class GreenTeaNew extends BeverageNew {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
class NewBeverageDecorator extends BeverageNew {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
}
class newSugar extends NewBeverageDecorator {
    getDescription() {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost() {
        return this.beverage.getCost() + 10;
    }
}
class Honey extends NewBeverageDecorator {
    getDescription() {
        return this.beverage.getDescription() + " + Honey";
    }
    getCost() {
        return this.beverage.getCost() + 20;
    }
}
const Mtea = new Honey(new newSugar(new GreenTeaNew()));
console.log(Mtea.getDescription());
console.log(Mtea.getCost());
