"use strict";
class Book {
    constructor(title, author, reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }
    clone() {
        const copiedReviews = [...this.reviews];
        return new Book(this.title, this.author, copiedReviews);
    }
}
function main4() {
    const original = new Book("Fly like Eagle", "Swapnil", ["good book"]);
    const cloned = original.clone();
    cloned.reviews.push("Great");
    console.log("Original Book Reviews:", original.reviews);
    console.log("Copy Book Reviews:", cloned.reviews);
}
main4();
