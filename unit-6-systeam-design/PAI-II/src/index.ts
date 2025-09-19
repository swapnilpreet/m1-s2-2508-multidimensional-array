import { Latte } from "./Coffee";
import { CaramelSyrup, Milk } from "./CoffeeDecorator";
import { CustomerDisplay } from "./Observer";
import { Order } from "./Order";
import { OrderManager } from "./OrderManager";
import { CreditCardPayment } from "./Payment";




function main (){
    let lattle = new Latte();
    const decorated=new Milk(new CaramelSyrup(lattle))
    console.log(decorated.getCost())
    console.log(decorated.getDescription())

    let order=new Order("order-one",decorated);
    const Display=new CustomerDisplay("Main-counter");
    order.registerObserver(Display);

    const manager=OrderManager.getInstance();
    manager.addOrder(order);
    order.setPaymentStrategy(new CreditCardPayment("4445-1222-2221-8885"))
    const paid=order.processPayment();
    console.log('paymet Success',paid)

    order.proceedToNextState();
    order.proceedToNextState();
    order.proceedToNextState();

    console.log('Active order in manager',manager.getActiveOrders().map((ord)=>ord.id))
}

main()