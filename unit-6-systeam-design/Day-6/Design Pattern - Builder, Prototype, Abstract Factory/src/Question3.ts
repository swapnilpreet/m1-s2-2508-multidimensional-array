class Car {
  readonly brand: string;
  readonly engine: string;
  readonly color: string;
  readonly sunroof: boolean;
  readonly automaticTransmission: boolean;
  constructor(
    brand: string,
    engine: string,
    color: string,
    sunroof: boolean,
    automaticTransmission: boolean
  ) {
    this.brand = brand;
    this.engine = engine;
    this.color = color;
    this.sunroof = sunroof;
    this.automaticTransmission = automaticTransmission;
    Object.freeze(this);
  }
  describe(): string {
    return `${this.brand} with ${this.engine} engine, ${this.color} color, ${
      this.sunroof ? "sunroof" : "no sunroof"
    }, and ${this.automaticTransmission ? "automatic" : "manual"} transmission.`;
  }
}

class CarBuilder {
  private _brand: string = "Unknown";
  private _engine: string = "Petrol";
  private _color: string = "White";
  private _sunroof: boolean = false;
  private _automaticTransmission: boolean = false;
  setBrand(brand: string): this {
    this._brand = brand;
    return this;
  }
  setEngine(engine: string): this {
    this._engine = engine;
    return this;
  }
  setColor(color: string): this {
    this._color = color;
    return this;
  }
  addSunroof(): this {
    this._sunroof = true;
    return this;
  }
  enableAutomaticTransmission(): this {
    this._automaticTransmission = true;
    return this;
  }
  build(): Car {
    return new Car(
      this._brand,
      this._engine,
      this._color,
      this._sunroof,
      this._automaticTransmission
    );
  }
}


function main3() {
  const teslaModelS = new CarBuilder()
    .setBrand("Tesla Model S")
    .setEngine("electric")
    .setColor("black")
    .addSunroof()
    .enableAutomaticTransmission()
    .build();
  console.log(teslaModelS.describe());
  console.log(JSON.stringify(teslaModelS, null, 2));
}
main3();
