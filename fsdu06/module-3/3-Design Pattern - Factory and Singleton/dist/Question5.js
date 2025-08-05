"use strict";
class Laptop {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getDescription() {
        return `Laptop: ${this.name}, Price: $${this.price}`;
    }
}
class Mobile {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getDescription() {
        return `Mobile: ${this.name}, Price: $${this.price}`;
    }
}
class Tablet {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getDescription() {
        return `Tablet: ${this.name}, Price: $${this.price}`;
    }
}
const productMap = {
    Laptop: Laptop,
    Mobile: Mobile,
    Tablet: Tablet,
};
class ProductFactory {
    static createProduct(type, name, price) {
        const ProductClass = productMap[type];
        if (!ProductClass) {
            throw new Error(`Unknown product type: ${type}`);
        }
        return new ProductClass(name, price);
    }
}
const t = ProductFactory.createProduct("Tablet", "Galaxy Tab", 1100);
console.log(t.getDescription());
