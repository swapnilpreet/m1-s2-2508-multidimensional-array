interface ShippingStrategy {
  calculate(): number;
}
class StandardShipping implements ShippingStrategy {
  calculate(): number {
    return 50;
  }
}
class ExpressShipping implements ShippingStrategy {
  calculate(): number {
    return 100;
  }
}
class Shipping {
  private strategy: ShippingStrategy;
  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }
  calculateCost(): number {
    return this.strategy.calculate();
  }
}

const newstandard = new Shipping(new StandardShipping());
console.log(newstandard.calculateCost());
const newexpress = new Shipping(new ExpressShipping());
console.log(newexpress.calculateCost());
