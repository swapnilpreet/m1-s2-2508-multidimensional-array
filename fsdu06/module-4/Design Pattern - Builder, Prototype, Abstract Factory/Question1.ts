class Pizza {
  private size: string;
  private cheese: boolean;
  private pepperoni: boolean;
  private mushrooms: boolean;

  constructor(
    size: string,
    cheese: boolean,
    pepperoni: boolean,
    mushrooms: boolean
  ) {
    this.size = size;
    this.cheese = cheese;
    this.pepperoni = pepperoni;
    this.mushrooms = mushrooms;
  }

  getDetails(): string {
    return `Pizza Details size:${this.size} cheese: ${
      this.cheese ? "Added" : "Not Added"
    } pepperoni : ${this.pepperoni ? "Added" : "Not Added"} mushrooms : ${
      this.mushrooms ? "Added" : "Not Added"
    }`;
  }
}

class PizzaBuilder {
  private size: string = "medium";
  private cheese: boolean = false;
  private pepperoni: boolean = false;
  private mushrooms: boolean = false;

  setsize(size: "small" | "medium" | "large"): this {
    this.size = size;
    return this;
  }
  addCheese(): this {
    this.cheese = true;
    return this;
  }
  addPepperoni(): this {
    this.pepperoni = true;
    return this;
  }
  addMushrooms(): this {
    this.mushrooms = true;
    return this;
  }
  build(): Pizza {
    return new Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms);
  }
}

function main(): void {
  const newpizza = new PizzaBuilder()
    .setsize("large")
    .addCheese()
    .addMushrooms()
    .build();

  console.log(newpizza.getDetails());
}

main();
