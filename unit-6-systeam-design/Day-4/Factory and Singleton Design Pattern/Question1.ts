interface Vehicle {
  getDetails(): string;
}
class Bike implements Vehicle {
  constructor(private name: string) {}
  getDetails(): string {
    return `Bike: ${this.name}`;
  }
}
class Car implements Vehicle {
  constructor(private name: string) {}
  getDetails(): string {
    return `Car: ${this.name}`;
  }
}
class VehicleFactory {
  static createVehicle(type: "Bike" | "Car", name: string): Vehicle {
    switch (type) {
      case "Bike":
        return new Bike(name);
      case "Car":
        return new Car(name);
      default:
        throw new Error("Unknown vehicle type");
    }
  }
}
let myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
let myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myBike.getDetails());
console.log(myCar.getDetails());


