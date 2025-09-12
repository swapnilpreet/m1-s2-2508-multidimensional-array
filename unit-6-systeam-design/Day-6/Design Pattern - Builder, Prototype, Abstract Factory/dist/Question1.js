"use strict";
class Pizza {
    constructor(size, cheese, pepperoni, mushrooms) {
        this.size = size;
        this.cheese = cheese;
        this.pepperoni = pepperoni;
        this.mushrooms = mushrooms;
        Object.freeze(this);
    }
    describe() {
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
    constructor() {
        this._size = "medium";
        this._cheese = false;
        this._pepperoni = false;
        this._mushrooms = false;
    }
    size(size) {
        this._size = size;
        return this;
    }
    addCheese() {
        this._cheese = true;
        return this;
    }
    addPepperoni() {
        this._pepperoni = true;
        return this;
    }
    addMushrooms() {
        this._mushrooms = true;
        return this;
    }
    removeCheese() {
        this._cheese = false;
        return this;
    }
    build() {
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
