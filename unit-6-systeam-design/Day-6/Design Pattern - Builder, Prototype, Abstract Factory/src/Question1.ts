type Size = "small" | "medium" | "large";

class Pizza {
  readonly size: Size;
  readonly cheese: boolean;
  readonly pepperoni: boolean;
  readonly mushrooms: boolean;

  constructor(size: Size, cheese: boolean, pepperoni: boolean, mushrooms: boolean) {
    this.size = size;
    this.cheese = cheese;
    this.pepperoni = pepperoni;
    this.mushrooms = mushrooms;
    Object.freeze(this);
  }

  describe(): string {
    const toppings = [
      this.cheese ? "cheese" : null,
      this.pepperoni ? "pepperoni" : null,
      this.mushrooms ? "mushrooms" : null,
    ]
      .filter(Boolean)
      .join(", ");
    return `${this.size.toUpperCase()} pizza with ${toppings || "no toppings"}.`;
  }
}

class PizzaBuilder {
  private _size: Size = "medium";
  private _cheese = false;
  private _pepperoni = false;
  private _mushrooms = false;
  size(size: Size): this {
    this._size = size;
    return this;
  }

  addCheese(): this {
    this._cheese = true;
    return this;
  }

  addPepperoni(): this {
    this._pepperoni = true;
    return this;
  }

  addMushrooms(): this {
    this._mushrooms = true;
    return this;
  }
  removeCheese(): this {
    this._cheese = false;
    return this;
  }

  build(): Pizza {
    return new Pizza(this._size, this._cheese, this._pepperoni, this._mushrooms);
  }
}
function main() {
  const pizza = new PizzaBuilder()
    .size("large")
    .addCheese()
    .addMushrooms()
    .build();
  console.log(pizza.describe());
  console.log(JSON.stringify(pizza, null, 2));
}

main();
