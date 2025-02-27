// Q: 11
// Title: L0 - Understanding Global and Function Execution Context

let age = 25;

function displayAge() {
  console.log(age);
}

function changeAge() {
  age = 45;
  console.log(age);
}

displayAge();
changeAge();

// Q: 12
// Title:
// L0 - Fixing Array and Object Operations

const library = {
  books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],

  addBook(book) {
    if (!book.title || !book.author || !book.year) {
      console.log("Book information is incomplete.");
      return;
    }
    this.books.push(book);
  },

  findBookByTitle(title) {
    return this.books.find((book) => book.title === title);
  },

  removeBook(title) {
    const index = this.books.findIndex((book) => book.title === title);

    if (index !== -1) {
      this.books.splice(index, 1);
    } else {
      console.log("Book not found.");
    }
  },
};

library.addBook({ title: "swapnil", author: "George Orwell", year: 1949 });

console.log(library.books.length);



// Q: 14
// Title:
// L1 - Debugging Object Methods

const checkout = {
  items: [],

  total: 0,

  addItem(item) {
    if (typeof item.price !== "number" || isNaN(item.price)) {
      console.log("Invalid price.");

      return;
    }

    this.items.push(item);

    this.total += item.price;
  },

  getTotal() {
    return `Total:${parseFloat(this.total).toFixed(2)}`;
  },
};

checkout.addItem({ name: "Coffee Maker", price: "99.95" });


// Q: 15
// Title:
// L2 - Preventing Stack Overflow in Recursion


function calfactorial(n) {
    if(typeof n !== "number" || isNaN(n)){
       return "Invalid number"
    }
    if(n < 0){
        return "Invalid input"
    }
    if(n===0){
        return 1;
    }
    return n*calfactorial(n-1)
}
console.log(calfactorial(5) )