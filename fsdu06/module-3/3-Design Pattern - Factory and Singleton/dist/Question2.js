"use strict";
class RegularBook {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getCategory() {
        return "Regular Book";
    }
}
class PremiumBook {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getCategory() {
        return "Premium Book";
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
console.log(b1.getCategory());
const b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b2.getCategory());
