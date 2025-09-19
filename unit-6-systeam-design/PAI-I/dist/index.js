"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coffee_1 = require("./Coffee");
const CoffeeDecorator_1 = require("./CoffeeDecorator");
function main() {
    let lattle = new Coffee_1.Latte();
    const decorated = new CoffeeDecorator_1.Milk(new CoffeeDecorator_1.CaramelSyrup(lattle));
    console.log(decorated.getCost());
    console.log(decorated.getDescription());
}
main();
