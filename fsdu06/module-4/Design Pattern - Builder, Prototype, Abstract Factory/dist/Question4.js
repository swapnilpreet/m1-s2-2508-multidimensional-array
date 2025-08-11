"use strict";
class Book {
    constructor(title, author, reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }
    clone() {
        let copiedReviews = [...this.reviews];
        return new Book(this.title, this.author, copiedReviews);
    }
}
function main4() {
    let newbook = new Book("Next stop is top", "Swapnilpreet", ["good book for growth"]);
    console.log("newbook", newbook);
    let newbookClone = newbook.clone();
    newbookClone.reviews.push("new added review");
    console.log("newbookClone", newbookClone);
    console.log("Is both are are some", newbook === newbookClone);
    console.log("Is both are are some", typeof newbook === typeof newbookClone);
}
main4();
