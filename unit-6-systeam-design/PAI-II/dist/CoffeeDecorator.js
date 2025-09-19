"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaramelSyrup = exports.Milk = exports.CoffeeDecorator = void 0;
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
}
exports.CoffeeDecorator = CoffeeDecorator;
class Milk extends CoffeeDecorator {
    getDescription() {
        return this.coffee.getDescription() + " with Milk ";
    }
    getCost() {
        return this.coffee.getCost() + 22;
    }
}
exports.Milk = Milk;
class CaramelSyrup extends CoffeeDecorator {
    getDescription() {
        return this.coffee.getDescription() + " With CaramelSyrup ";
    }
    getCost() {
        return this.coffee.getCost() + 45;
    }
}
exports.CaramelSyrup = CaramelSyrup;
