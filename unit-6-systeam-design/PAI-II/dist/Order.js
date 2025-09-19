"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, coffee) {
        this.observers = [];
        this.id = id;
        this.coffee = coffee;
        this._state = new PendingState();
    }
    setState(state) {
        this._state = state;
        this.notifyObservers();
    }
    getState() {
        return this._state;
    }
    proceedToNextState() {
        this._state.proceed(this);
    }
    cancelOrder() {
        this._state.cancel(this);
    }
    setPaymentStrategy(strategy) {
        this.paymentStrategy = strategy;
    }
    processPayment() {
        if (!this.paymentStrategy) {
            console.log("No payment strategy set");
            return false;
        }
        const amount = this.coffee.getCost();
        return this.paymentStrategy.pay(amount);
    }
    registerObserver(obs) {
        this.observers.push(obs);
    }
    removeObserver(obs) {
        this.observers = this.observers.filter((o) => o !== obs);
    }
    notifyObservers() {
        for (const obs of this.observers) {
            obs.update(this.id, this._state.name());
        }
    }
}
exports.Order = Order;
class PendingState {
    name() {
        return "Pending";
    }
    proceed(order) {
        console.log(`Order ${order.id}: Pending to Preparing`);
        order.setState(new PreparingState());
    }
    cancel(order) {
        console.log(`Order ${order.id} canceled from Pending`);
        order.setState(new CompletedState(true));
    }
}
class PreparingState {
    name() {
        return "Preparing";
    }
    proceed(order) {
        console.log(`Order ${order.id}: Preparing to Ready`);
        order.setState(new ReadyState());
    }
    cancel(order) {
        console.log(`Order ${order.id} canceled from Preparing`);
        order.setState(new CompletedState(true));
    }
}
class ReadyState {
    name() {
        return "Ready";
    }
    proceed(order) {
        console.log(`Order ${order.id}: Ready to Completed`);
        order.setState(new CompletedState(false));
    }
    cancel(order) {
        console.log(`Order ${order.id} canceled from Ready`);
        order.setState(new CompletedState(true));
    }
}
class CompletedState {
    constructor(canceled = false) {
        this.canceled = canceled;
    }
    name() {
        return this.canceled ? "Canceled" : "Completed";
    }
    proceed(order) {
        console.log(`Order ${order.id} is already ${this.name()}.`);
    }
    cancel(order) {
        console.log(`Order ${order.id} cannot be canceled; already ${this.name()}.`);
    }
}
