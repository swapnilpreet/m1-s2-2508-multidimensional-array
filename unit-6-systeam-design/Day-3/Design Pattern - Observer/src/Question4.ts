abstract class BeverageNew {
  abstract getDescription(): string;
  abstract getCost(): number;
}
class GreenTeaNew extends BeverageNew {
  getDescription(): string {
    return "Green Tea";
  }
  getCost(): number {
    return 40;
  }
}
abstract class NewBeverageDecorator extends BeverageNew {
  protected beverage: BeverageNew;
  constructor(beverage: BeverageNew) {
    super();
    this.beverage = beverage;
  }
}
class newSugar extends NewBeverageDecorator {
  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}
class Honey extends NewBeverageDecorator {
  getDescription(): string {
    return this.beverage.getDescription() + " + Honey";
  }
  getCost(): number {
    return this.beverage.getCost() + 20;
  }
}
const Mtea = new Honey(new newSugar(new GreenTeaNew()));
console.log(Mtea.getDescription());
console.log(Mtea.getCost());
