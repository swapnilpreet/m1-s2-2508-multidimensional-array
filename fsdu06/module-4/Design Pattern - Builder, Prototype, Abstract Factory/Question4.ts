


class Book {
    title:string;
    author:string;
    reviews:string[];
    constructor(title:string, author:string,reviews:string[]) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }
    clone():Book {
        let copiedReviews=[...this.reviews]
        return new Book(this.title, this.author, copiedReviews);
    }
}


function main4(): void {
  let newbook = new Book("Next stop is top", "Swapnilpreet", ["good book for growth"]);
  console.log("newbook", newbook);
  let newbookClone = newbook.clone();
  newbookClone.reviews.push("new added review")
  console.log("newbookClone", newbookClone);
  console.log("Is both are are some", newbook === newbookClone);
  console.log("Is both are are some", typeof newbook === typeof newbookClone);
}

main4();
