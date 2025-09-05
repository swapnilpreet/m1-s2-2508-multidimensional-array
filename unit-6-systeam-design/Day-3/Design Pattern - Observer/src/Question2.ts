abstract class AbstractBeverage {
  abstract getDescription(): string;
  abstract getCost(): number;
}
class ConcreteGreenTea extends AbstractBeverage {
  getDescription(): string {
    return "Green Tea";
  }
  getCost(): number {
    return 40;
  }
}
abstract class BeverageDecorator extends AbstractBeverage {
  protected beverage: AbstractBeverage;
  constructor(beverage: AbstractBeverage) {
    super();
    this.beverage = beverage;
  }
}
class Sugar extends BeverageDecorator {
  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}
const newtea = new Sugar(new ConcreteGreenTea());
console.log(newtea.getDescription());
console.log(newtea.getCost());
