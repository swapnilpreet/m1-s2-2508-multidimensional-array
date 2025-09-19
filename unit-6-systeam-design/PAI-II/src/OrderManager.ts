import { Order } from "./Order";



export class OrderManager{
    private static instance:OrderManager;
    orders:Map<string, Order>=new Map();
    constructor(){}
    static getInstance():OrderManager{
        if(!OrderManager.instance){
            OrderManager.instance= new OrderManager();
        }
        return OrderManager.instance;
    }
    addOrder(order:Order){
        this.orders.set(order.id,order);
    }
    getOrder(id:string):Order | undefined{
        return this.orders.get(id);
    }
    removeOrder(id:string){
        this.orders.delete(id)
    }
    getActiveOrders():Order[]{
        return Array.from(this.orders.values());
    }
}

