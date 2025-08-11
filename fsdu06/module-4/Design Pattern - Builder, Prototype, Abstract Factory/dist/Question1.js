"use strict";
class Pizza {
    constructor(size, cheese, pepperoni, mushrooms) {
        this.size = size;
        this.cheese = cheese;
        this.pepperoni = pepperoni;
        this.mushrooms = mushrooms;
    }
    getDetails() {
        return `Pizza Details size:${this.size} cheese: ${this.cheese ? "Added" : "Not Added"} pepperoni : ${this.pepperoni ? "Added" : "Not Added"} mushrooms : ${this.mushrooms ? "Added" : "Not Added"}`;
    }
}
class PizzaBuilder {
    constructor() {
        this.size = "medium";
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
    }
    setsize(size) {
        this.size = size;
        return this;
    }
    addCheese() {
        this.cheese = true;
        return this;
    }
    addPepperoni() {
        this.pepperoni = true;
        return this;
    }
    addMushrooms() {
        this.mushrooms = true;
        return this;
    }
    build() {
        return new Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms);
    }
}
function main() {
    const newpizza = new PizzaBuilder()
        .setsize("large")
        .addCheese()
        .addMushrooms()
        .build();
    console.log(newpizza.getDetails());
}
main();
