"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coffee_1 = require("./Coffee");
const CoffeeDecorator_1 = require("./CoffeeDecorator");
const Observer_1 = require("./Observer");
const Order_1 = require("./Order");
const OrderManager_1 = require("./OrderManager");
const Payment_1 = require("./Payment");
function main() {
    let lattle = new Coffee_1.Latte();
    const decorated = new CoffeeDecorator_1.Milk(new CoffeeDecorator_1.CaramelSyrup(lattle));
    console.log(decorated.getCost());
    console.log(decorated.getDescription());
    let order = new Order_1.Order("order-one", decorated);
    const Display = new Observer_1.CustomerDisplay("Main-counter");
    order.registerObserver(Display);
    const manager = OrderManager_1.OrderManager.getInstance();
    manager.addOrder(order);
    order.setPaymentStrategy(new Payment_1.CreditCardPayment("4445-1222-2221-8885"));
    const paid = order.processPayment();
    console.log('paymet Success', paid);
    order.proceedToNextState();
    order.proceedToNextState();
    order.proceedToNextState();
    console.log('Active order in manager', manager.getActiveOrders().map((ord) => ord.id));
}
main();
