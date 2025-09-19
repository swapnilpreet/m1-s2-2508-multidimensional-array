"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderManager = void 0;
class OrderManager {
    constructor() {
        this.orders = new Map();
    }
    static getInstance() {
        if (!OrderManager.instance) {
            OrderManager.instance = new OrderManager();
        }
        return OrderManager.instance;
    }
    addOrder(order) {
        this.orders.set(order.id, order);
    }
    getOrder(id) {
        return this.orders.get(id);
    }
    removeOrder(id) {
        this.orders.delete(id);
    }
    getActiveOrders() {
        return Array.from(this.orders.values());
    }
}
exports.OrderManager = OrderManager;
