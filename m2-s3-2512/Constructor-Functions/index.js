// Q: 11
// Title:
// L0 - Understanding Factory Functions in JavaScript

function createEmployee(name, role, salary) {
  return {
    name,
    role,
    salary,
    introduce() {
      console.log(`Hello I am ${name}, working as a ${role}`);
    },
  };
}

const employee1 = createEmployee("Alice", "Developer", 60000);
employee1.introduce();
// Output: Hello, I am Alice, working as a Developer.

// Q: 12
// Title:
// L0 - Creating and Using Methods in Factory Functions

function createCar(make, model, year) {
  return {
    make,
    model,
    year,
    describeCar() {
      console.log(`This car is a ${this.year} ${this.make} ${this.model}.`);
    },
  };
}

const car = createCar("Toyota", "Camry", 2022);
car.describeCar();
// Output: This car is a 2022 Toyota Camry.

// Q: 13
// Title:
// L1 - Factory Functions with Dynamic Property Addition

function createInventoryItem(name, category, price) {
  return {
    name,
    category,
    price,
    describeItem() {
      console.log(
        `Item: ${this.name}, Category: ${this.category}, Price: ${this.price}`
      );
    },
  };
}

function addItemDiscount(Item, dispercent) {
  const disprice = Item.price * (1 - dispercent / 100);

  return {
    ...Item,
    dispercent,
    disprice,
    applyDiscount() {
      console.log(`Discounted Price for ${Item.name}: ${this.disprice}`);
    },
  };
}

const item = createInventoryItem("Laptop", "Electronics", 1500);
item.describeItem(); // Output: Item: Laptop, Category: Electronics, Price: 1500

const discountedItem = addItemDiscount(item, 10);
discountedItem.applyDiscount(); // Output: Discounted Price for Laptop: 1350

//   Q: 14
//   Title:
//   L1 - Debugging this in Factory Function Methods

function createBook(title, author) {
  return {
    title: title,
    author: author,
    printInfo() {
      console.log("Book: " + this.title + ", Author: " + this.author);
    },
  };
}

const book = createBook("1984", "George Orwell");
book.printInfo();
// Output: Book: 1984, Author: George Orwell

// Q: 15
// Title:
// L2 - Building a Library Management System Using Factory Functions

function Book(title, author) {
  return {
    title,
    author,
    details() {
      console.log(`Title: ${this.title}, Author: ${this.author}`);
    },
  };
}
function createLibrary() {
  const books = [];

  return {
    addBook(book) {
      books.push(book);
    },
    removeBook(title) {
      const index = books.findIndex((book) => book.title === title);
      if (index !== -1) {
        books.splice(index, 1);
      }
    },
    listBooks() {
      if (books.length === 0) {
        console.log("No books available in the library.");
      } else {
        books.forEach((book) => book.details());
      }
    },
  };
}

const library = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);

library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee
// Title: 1984, Author: George Orwell

library.removeBook("1984");
library.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee
