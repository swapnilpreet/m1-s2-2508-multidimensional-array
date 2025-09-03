interface IEngine {
  start(): void;
}
class PetrolEngine implements IEngine {
  start(): void {
    console.log("Petrol engine started");
  }
}
class DieselEngine implements IEngine {
  start(): void {
    console.log("Diesel engine started");
  }
}
class NEwCar {
  private engine: IEngine;
  constructor(engine: IEngine) {
    this.engine = engine;
  }
  drive(): void {
    this.engine.start();
    console.log("Driving car");
  }
}
const petrolCar = new NEwCar(new PetrolEngine());
petrolCar.drive();
const dieselCar = new NEwCar(new DieselEngine());
dieselCar.drive();
