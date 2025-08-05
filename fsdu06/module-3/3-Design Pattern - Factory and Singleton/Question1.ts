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
  static createVehicle(type: string, name: string): Vehicle {
    if (type === "Bike") {
      return new Bike(name);
    } else if (type === "Car") {
      return new Car(name);
    } else {
      throw new Error("Invalid vehicle type");
    }
  }
}


const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails());

const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails()); 
