abstract class NEWBeverage {
  abstract getDescription(): string;
  abstract getCost(): number;
}
class NewGreenTea extends NEWBeverage {
  getDescription(): string {
    return "Green Tea";
  }
  getCost(): number {
    return 40;
  }
}
abstract class BDecorator extends NEWBeverage {
  protected beverage: NEWBeverage;
  constructor(beverage: NEWBeverage) {
    super();
    this.beverage = beverage;
  }
}
class NEWSugar extends BDecorator {
  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}
const Newtea = new NEWSugar(new NEWSugar(new NewGreenTea()));
console.log(Newtea.getDescription());
console.log(Newtea.getCost());
