import { Subject, Observer } from "./Observer";
import { PaymentStrategy } from "./Payment";
import { ICoffee } from "./Coffee";


export interface OrderState {
  name(): string;
  proceed(order: Order): void;
  cancel(order: Order): void;
}

export class Order implements Subject{
  private _state: OrderState;
  public id: string;
  public coffee: ICoffee;
  private paymentStrategy?: PaymentStrategy;
  private observers: Observer[] = [];

  constructor(id: string, coffee: ICoffee){
    this.id = id;
    this.coffee = coffee;
    this._state = new PendingState();
  }
  setState(state: OrderState){
    this._state = state;
    this.notifyObservers();
  }

  getState(): OrderState {
    return this._state;
  }

  proceedToNextState() {
    this._state.proceed(this);
  }

  cancelOrder() {
    this._state.cancel(this);
  }
  setPaymentStrategy(strategy: PaymentStrategy) {
    this.paymentStrategy = strategy;
  }
  processPayment(): boolean {
    if (!this.paymentStrategy) {
      console.log("No payment strategy set");
      return false;
    }
    const amount = this.coffee.getCost();
    return this.paymentStrategy.pay(amount);
  }
  registerObserver(obs: Observer): void {
    this.observers.push(obs);
  }
  removeObserver(obs: Observer): void {
    this.observers = this.observers.filter((o) => o !== obs);
  }
  notifyObservers(): void {
    for (const obs of this.observers) {
      obs.update(this.id, this._state.name());
    }
  }
}

class PendingState implements OrderState {
  name(): string {
    return "Pending";
  }
  proceed(order: Order): void {
    console.log(`Order ${order.id}: Pending to Preparing`);
    order.setState(new PreparingState());
  }
  cancel(order: Order): void {
    console.log(`Order ${order.id} canceled from Pending`);
    order.setState(new CompletedState(true));
  }
}
class PreparingState implements OrderState {
  name(): string {
    return "Preparing";
  }
  proceed(order: Order): void {
    console.log(`Order ${order.id}: Preparing to Ready`);
    order.setState(new ReadyState());
  }
  cancel(order: Order): void {
    console.log(`Order ${order.id} canceled from Preparing`);
    order.setState(new CompletedState(true));
  }
}
class ReadyState implements OrderState {
  name(): string {
    return "Ready";
  }
  proceed(order: Order): void {
    console.log(`Order ${order.id}: Ready to Completed`);
    order.setState(new CompletedState(false));
  }
  cancel(order: Order): void {
    console.log(`Order ${order.id} canceled from Ready`);
    order.setState(new CompletedState(true));
  }
}
class CompletedState implements OrderState {
  private canceled: boolean;
  constructor(canceled: boolean = false) {
    this.canceled = canceled;
  }
  name(): string {
    return this.canceled ? "Canceled" : "Completed";
  }
  proceed(order: Order): void {
    console.log(`Order ${order.id} is already ${this.name()}.`);
  }
  cancel(order: Order): void {
    console.log(
      `Order ${order.id} cannot be canceled; already ${this.name()}.`
    );
  }
}
