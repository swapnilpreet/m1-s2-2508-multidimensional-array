"use strict";
class PremiumBook {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getCategory() {
        return `Premium Book`;
    }
}
class RegularBook {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getCategory() {
        return `Regular Book`;
    }
}
class BookFactory {
    static createBook(title, price) {
        if (price > 1000) {
            return new PremiumBook(title, price);
        }
        else {
            return new RegularBook(title, price);
        }
    }
}
const b1 = BookFactory.createBook("Design Patterns", 1500);
const b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b1.getCategory());
console.log(b2.getCategory());
