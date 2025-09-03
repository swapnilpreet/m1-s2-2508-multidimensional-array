interface Vehicle {
  start(): void;
}
class NEWBike implements Vehicle {
  start(): void {
    console.log("Bike is starting");
  }
}
class NEWCar implements Vehicle {
  start(): void {
    console.log("Car is starting");
  }
}
class NEWDriver {
  private vehicle: Vehicle;
  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }
  setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }
  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}
const driver = new NEWDriver(new NEWBike());
driver.drive();
driver.setVehicle(new NEWCar());
driver.drive();
