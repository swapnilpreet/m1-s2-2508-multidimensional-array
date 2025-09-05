abstract class BeverageKEY {
  abstract getDescription(): string;
  abstract getCost(): number;
}
class Espresso extends BeverageKEY {
  getDescription(): string {
    return "Espresso";
  }
  getCost(): number {
    return 80;
  }
}
class LemonTea extends BeverageKEY {
  getDescription(): string {
    return "LemonTea";
  }
  getCost(): number {
    return 40;
  }
}
abstract class BeverageDecoratorKEY extends BeverageKEY {
  protected beverage: BeverageKEY;
  constructor(beverage: BeverageKEY) {
    super();
    this.beverage = beverage;
  }
}
class SugarKEY extends BeverageDecoratorKEY {
  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}
class HoneyKEY extends BeverageDecoratorKEY {
  getDescription(): string {
    return this.beverage.getDescription() + " + Honey";
  }
  getCost(): number {
    return this.beverage.getCost() + 20;
  }
}
class WhippedCreamKEY extends BeverageDecoratorKEY {
  getDescription(): string {
    return this.beverage.getDescription() + " + WhippedCream";
  }
  getCost(): number {
    return this.beverage.getCost() + 15;
  }
}
const order1 = new HoneyKEY(new WhippedCreamKEY(new Espresso()));
const order2 = new SugarKEY(new SugarKEY(new LemonTea()));
console.log("Order 1:", order1.getDescription());
console.log("Order 2:", order2.getDescription());
console.log("Cost 1: ₹", order1.getCost());
console.log("Cost 2: ₹", order2.getCost());
