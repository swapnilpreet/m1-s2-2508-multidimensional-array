enum VehicleType {
  BIKE = "Bike",
  CAR = "Car",
  EV = "EV",
  TRUCK = "Truck"
}

class Vehicle {
  constructor(public number: string, public type: VehicleType) {}
}

class ParkingSlot {
  constructor(
    public id: number,
    public isAvailable: boolean,
    public isEVOnly: boolean = false
  ) {}
}
