abstract class BeverageNEW {
  abstract getDescription(): string;
  abstract getCost(): number;
}
class GreenTeaNEW extends BeverageNEW {
  getDescription(): string {
    return "Green Tea";
  }
  getCost(): number {
    return 40;
  }
}
class Coffee extends BeverageNEW {
  getDescription(): string {
    return "Coffee";
  }
  getCost(): number {
    return 50;
  }
}
abstract class BeverageDecoratorNEW extends BeverageNEW {
  protected beverage: BeverageNEW;
  constructor(beverage: BeverageNEW) {
    super();
    this.beverage = beverage;
  }
}
class SugarNEW extends BeverageDecoratorNEW {
  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}
class HoneyNEW extends BeverageDecoratorNEW {
  getDescription(): string {
    return this.beverage.getDescription() + " + Honey";
  }
  getCost(): number {
    return this.beverage.getCost() + 20;
  }
}
class WhippedCream extends BeverageDecoratorNEW {
  getDescription(): string {
    return this.beverage.getDescription() + " + WhippedCream";
  }
  getCost(): number {
    return this.beverage.getCost() + 15;
  }
}
const myDrink = new WhippedCream(new HoneyNEW(new SugarNEW(new Coffee())));
console.log(myDrink.getDescription());
console.log(myDrink.getCost());
