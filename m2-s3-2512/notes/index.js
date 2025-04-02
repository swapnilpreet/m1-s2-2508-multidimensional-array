// Factory Functions in JavaScript

// Learning Objectives

// By the end of this lesson, you will:

// Understand the concept of Factory Functions in JavaScript.

// Understand the this keyword in JavaScript and how it works in different contexts.

// Learn about call, apply, and bind methods used to manipulate the this value.

// Understand what constructor functions are and how they differ from regular functions.

// Learn how to use constructor functions to create multiple instances of objects.

// Learn about the new keyword and how it works in conjunction with constructor functions.


// 1. What are Factory Functions?

// A Factory Function is a function that returns an object when called. It provides a way to create and initialize objects by encapsulating the object creation process within a function. Factory functions allow you to generate multiple object instances with similar properties and methods without repeating code.

// Key Points:

// A factory function returns a new object every time it is called.
// Factory functions allow you to add methods to the objects they create.
// They promote reusability and help in creating modular code.


// Syntax:

function createObject() {
  let obj = {};

  obj.property1 = "value1";
  obj.method1 = function() {
    console.log("Method 1");
  };

  return obj;
}

let newObj = createObject();
newObj.method1(); // Output: Method


// 2. Why Are Factory Functions Useful?

// Factory functions make object creation more scalable and maintainable.
// For example, if you need to create multiple objects with similar properties (like user accounts or product entries), 
// using a factory function reduces repetition and makes your code more organized.


// Real-World Analogy / examples:

// Think of a factory function as a blueprint or assembly line in a factory, 
// where the same process is used to create multiple similar products (objects) with consistent features.



// 3. Detailed Explanation and Example

// Example 1: Bank Account Creation

// Imagine you need to create bank accounts for 90 lakh customers. Writing each account manually is inefficient.

// A factory function can automate the process:

function createAccount(accountNumber, name, type, balance, active) {
  let accountDetails = {};

  accountDetails.accountNumber = accountNumber;
  accountDetails.name = name;
  accountDetails.type = type;
  accountDetails.balance = balance;
  accountDetails.active = active;


  accountDetails.printAccountDetails = function() {
    console.log('Name:', this.name, 'Type:', this.type, 'Balance:', this.balance, 'Active:', this.active);
  };

  return accountDetails;
}

let account1 = createAccount(12345, "Vivek", "Savings", 50000, true);
let account2 = createAccount(67890, "Aslam", "Current", 150000, true);

account1.printAccountDetails(); // Output: Name: Vivek Type: Savings Balance: 50000 Active: true
account2.printAccountDetails(); // Output: Name: Aslam Type: Current Balance: 150000 Active: true


// Explanation:

// createAccount is a factory function that creates a new account object.
// Every time the function is called, it returns a new object with its own properties (accountNumber, name, etc.) and methods (printAccountDetails).


// 4. Factory Function with Methods

// A factory function can include methods that allow the object to perform actions, such as printing details or performing calculations.


// Example 2: User Management System

function User(name, age) {
  let userObj = {};

  userObj.name = name;
  userObj.age = age;

  userObj.printHello = function() {
    console.log(`Hello, my name is ${this.name}`);
  };

  return userObj;
}

let userPavan = User("Pavan", 26);
let userRoshan = User("Roshan", 30);

userPavan.printHello();  // Output: Hello, my name is Pavan
userRoshan.printHello();  // Output: Hello, my name is Roshan


// Explanation:

// The User function generates a new user object with a name, age, and a printHello() method that introduces the user.


// 5. Advanced Example: Extending Factory Functions

// You can build more advanced factory functions by copying properties or methods from another factory function.

// Example 3: Extending a User with a Student


function User(name, age) {

  let userObj = {};

  userObj.name = name;
  userObj.age = age;
  
  userObj.printHello = function() {
    console.log(`Hello, my name is ${this.name}`);
  };

  return userObj;
}

function Student(name, age, batch) {
  let studentObj = User(name, age);  // Copy properties from User
  studentObj.batch = batch;          // Add new property

  return studentObj;
}

let student1 = Student("Pavan",26,"BatchA");
console.log(student1);
// Output: { name: 'Pavan', age: 26, printHello: [Function], batch: 'BatchA' }
student1.printHello();  // Output: Hello, my name is Pavan


// Explanation:

// The Student factory function reuses the User function to copy properties like name and age and adds a new property, batch.

// 6. Practice Exercises
// Exercise 1: Creating Animal Objects

// Write a factory function called animal that generates objects representing animals. 
// Each animal should have the properties:

// noOfLegs: number of legs,
// vegetarian: whether it's vegetarian or not,
// Methods: eat() and greet() to print simple messages.

function animal(noOfLegs, vegetarian) {
  let obj = {};
  obj.noOfLegs = noOfLegs;
  obj.vegetarian = vegetarian;

  obj.eat = function() {
    console.log("eating...");
  };

  obj.greet = function() {
    console.log("greetings...");
  };

  return obj;
}

// Example usage
let animal1 = animal(4, true);
let animal2 = animal(6, false);

animal1.greet(); // Output: greetings...
animal2.eat();   // Output: eating...

// Exercise 2: Extending Animal to Create Bird Objects

// Write a factory function Bird that extends the animal factory function by adding a new property canFly.

function Bird(noOfLegs, vegetarian, canFly) {
  let birdObj = animal(noOfLegs, vegetarian);
  birdObj.canFly = canFly;

  return birdObj;
}

// Example usage

let bird1 = Bird(2, true, true);
console.log(bird1);

// Output: {noOfLegs:2,vegetarian:true,eat:[Function],greet:[Function],canFly:true}



// 7. Benefits of Factory Functions ;

// Scalability: we can easily create multiple objects with similar properties without repeating code.

// Encapsulation: The object creation process is encapsulated in a function, allowing we to modify or enhance it later without affecting the rest of the code.

// Code Reusability: Methods and properties can be shared across multiple objects, reducing redundancy.



// 8. Conclusion ;

// Factory functions are a powerful way to create and initialize objects in JavaScript, especially when you need multiple instances with similar properties and methods. By using factory functions, you can encapsulate object creation logic, promote code reuse, and simplify object management in large-scale applications.


// 9. Additional Resources

// MDN Web Docs:  Factory Functions in JavaScript
// The this Keyword and Methods:  call, apply, and bind in JavaScript


// 1. What is the this Keyword?

// The "this" keyword in JavaScript refers to the object that is executing the current function. 
// The value of this is determined at runtime and depends on how the function is invoked.


// Key Points:


// In a global context (outside any function), this refers to the global object (e.g., window in a browser).

// In a method (a function inside an object), this refers to the object that owns the method.

// In a constructor function, this refers to the new object being created.

// In event handlers or inline event attributes in HTML, this refers to the HTML element that triggered the event.



// Example 1: Global this

console.log(this); // In a browser, this will log the window object
// Example 2: this in a Method

let personAlice = {
  name: "Alice",
  greet: function() {
    console.log(this.name); // Refers to the person object
  }
};

personAlice.greet(); // Output: Alice

// Example 3: this in a Constructor Function

function Person(name) {
  this.name = name;
}

let personJohn = new Person("John");
console.log(personJohn.name); // Output: John


// 2. Manipulating this with call, apply, and bind

// JavaScript provides three methods to explicitly control the value of this when calling a
//  function: call, apply, and bind.

// Why Use call, apply, or bind?

// These three methods are helpful when we need to invoke a function in a specific context or when we want to pass a different object as the this value.

// call() Method

// The call() method allows you to invoke a function and explicitly set the value of this. You can also pass arguments to the function individually.

// Syntax:
// function.call(thisArg, arg1, arg2, ...)

// Example:

let personname = {
  name: "Alice",
  greet: function(age) {
    console.log(`Hello, my name is ${this.name} and I am ${age} years old.`);
  }
};

let personyears = { name: "Bob" };

// Using call to borrow greet method
personname.greet.call(personyears, 25); // Output: Hello, my name is Bob and I am 25 years old.

// apply() Method

// The apply() method is similar to call(), but instead of passing arguments individually, you pass them as an array.

// Syntax:
// function.apply(thisArg, [argsArray])

// Example:
let personHello = {
  name: "Alice",
  greet: function(age, occupation) {
    console.log(`Hello, my name is ${this.name}. I'm ${age} years old and work as a ${occupation}.`);
  }
};

let personBob = { name: "Bob" };

// Using apply to borrow greet method
personHello.greet.apply(personBob, [30, "developer"]);
// Output: Hello, my name is Bob. I'm 30 years old and work as a developer.

// bind() Method

// The bind() method creates a new function with a bound this value. It allows you to set the value of this permanently, and the new function can be invoked later with or without additional arguments.

// Syntax:
// let newFunction = function.bind(thisArg, arg1, arg2, ...)

// Example:

let personmy = {
  name: "Alice",
  greet: function(age) {
    console.log(`Hello, my name is ${this.name} and I am ${age} years old.`);
  }
};

let personI = { name: "Bob" };

// Using bind to create a new function with a bound `this`

let greetBob = personmy.greet.bind(personI,40);

greetBob(); // Output: Hello, my name is Bob and I am 40 years old.
// Explanation:

// The bind() method does not immediately call the function; instead, it returns a new function with the specified this value.

// The new function can be called later, making bind() useful when you need to create reusable or delayed function executions.


// 3. Practical Use Cases of call, apply, and bind

// Use Case 1: Function Borrowing

// You can borrow methods from one object and use them with another object using call, apply, or bind.

let car = {
  brand: "Tesla",
  showBrand: function() {
    console.log(`Car brand is ${this.brand}`);
  }
};

let bike = { brand: "Yamaha" };

// Borrow the car's showBrand method for the bike object
car.showBrand.call(bike); // Output: Car brand is Yamaha
// Use Case 2: Using apply() for Math Operations
// You can use apply() to pass an array of arguments to functions like Math.max() or Math.min().

let numbers = [3, 5, 7, 2, 9];

// Use apply to pass the array of numbers as arguments to Math.max
let maxNumber = Math.max.apply(null, numbers);
console.log(maxNumber); // Output: 9

// Use Case 3: Setting Event Handlers with bind()

// The bind() method is useful for ensuring the correct value of this when working with event handlers.

let button = document.getElementById("myButton");

let personrefers = {
  name: "Charlie",
  sayHello: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

// Using bind to ensure `this` refers to the `person` object in the event handler

button.addEventListener("click", personrefers.sayHello.bind(person));


// Explanation:

// Without bind(), this inside sayHello would refer to the button element when the event handler is triggered.

// Using bind(), we ensure that this refers to the person object, even when the function is used as an event handler.


// 4. Differences Between call, apply, and bind

// Method	Usage	Invokes Immediately?	Arguments
// call	Calls a function with a specific this value and individual arguments	Yes	Passed individually
// apply	Calls a function with a specific this value and an array of arguments	Yes	Passed as an array
// bind	Creates a new function with a bound this value, to be invoked later	No	Passed individually or partially applied


// 5. Common Pitfalls and Best Practices

// Pitfall 1: Losing this in Callbacks

// Sometimes this can be lost in callbacks, particularly when using event handlers or in asynchronous code. Use bind() to avoid this issue.

function UserName(name) {
  this.name = name;
}

UserName.prototype.sayHello = function() {
  setTimeout(function() {
    console.log(`Hello, my name is ${this.name}`);
  }.bind(this), 1000);
};

let userJohn = new UserName("John");
userJohn.sayHello(); // Output: Hello, my name is John


// Pitfall 2: Forgetting bind() in Event Listeners

// When using methods as event listeners, ensure that you use bind() to set the correct this context.

let person = {
  name: "Lucy",
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};

let button1 = document.getElementById("greetButton");
button1.addEventListener("click", person.greet.bind(person));  // Correct context

// 6. Practice Exercises

// Exercise 1: Borrowing Methods with call()

// Write a method called describe in an object person1. Use call() to borrow the method for person2.

// Exercise 2: Using apply() with Math Operations

// Create an array of numbers and use apply() to pass them to Math.min() and Math.max() to find the minimum and maximum numbers.

// Exercise 3: Creating New Functions with bind()

// Create a function that logs a greeting. Use bind() to create a new function with a different this value, and then call the new function later.



// 7. Summary

// this is a dynamic keyword in JavaScript that changes depending on how a function is called.
// call() and apply() are used to invoke functions immediately with a specific this context. call() takes individual arguments, while apply() takes an array of arguments.
// bind() is used to create a new function with a permanently bound this value,
// allowing you to call the function later.
// These methods are useful for function borrowing, 
// managing event handlers, and ensuring the correct context when executing functions.

// 8. Additional Resources
// MDN Web Docs: this keyword
// MDN Web Docs: call method
// MDN Web Docs: apply method
// MDN Web Docs: bind method


// Constructor Functions in JavaScript

// 1. What is a Constructor Function?

// A constructor function is a special type of function in JavaScript used to create and initialize objects. The main difference between a regular function and a constructor function is that a constructor is called using the new keyword and is intended to create new instances of objects.

// Key Points:

// Constructor functions allow you to define a template for creating multiple objects with similar properties and methods.

// Constructor functions follow the naming convention of starting with an uppercase letter.
// The this keyword inside the constructor refers to the new object being created.


// Syntax:

function ConstructorName(params) {
  // Initialize properties using 'this'
  this.property1 = value1;
  this.property2 = value2;

  // You can add methods as well
  this.method1 = function() {
    console.log("Method 1");
  };
}

let instance = new ConstructorName(params);

// 2. How Does the new Keyword Work?

// When a function is called using the new keyword, it automatically does the following:

// Creates a new empty object.
// Sets the this keyword to point to the new object.
// Executes the constructor function, initializing the properties and methods.
// Returns the new object.

// Example 1: Creating a Person with a Constructor Function

function Person(name, age) {
  this.name = name;
  this.age = age;

  this.greet = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  };
}

let person1 = new Person("Alice", 25);
let person2 = new Person("Bob", 30);

person1.greet(); // Output: Hello, my name is Alice and I am 25 years old.
person2.greet(); // Output: Hello, my name is Bob and I am 30 years old.

Explanation:

// Person is a constructor function that initializes objects with name, age, and a greet() method.
// The new keyword is used to create new instances of Person.

// 3. Understanding the this Keyword in Constructor Functions

// In a constructor function, this refers to the newly created object. 
// Each instance created by the constructor function has its own unique set of properties and methods.

// Example 2: Multiple Instances with Unique Data

function Car(make, model) {
  this.make = make;
  this.model = model;

  this.getDetails = function() {
    console.log(`Car: ${this.make} ${this.model}`);
  };
}

let car1 = new Car("Tesla", "Model 3");
let car2 = new Car("Toyota", "Corolla");

car1.getDetails(); // Output: Car: Tesla Model 3
car2.getDetails(); // Output: Car: Toyota Corolla


// Explanation:

// The Car constructor creates instances of cars with the make and model properties.
// Each instance (car1 and car2) has its own values for make and model.


// 4. Best Practices for Constructor Functions

// 1. Naming Convention
// Always start constructor function names with a capital letter to distinguish them from regular functions. This is a common convention in JavaScript.


function Animal(type) {
  this.type = type;
}


// 2. Use this Properly:

// Inside constructor functions, this should be used to refer to the properties and methods of the object being created.

function Person(name) {
  this.name = name;
}

// 3. Avoid Returning Values:

// A constructor function does not need an explicit return statement. By default, it returns the object created by new.

function Book(title, author) {
  this.title = title;
  this.author = author;
}

// 4. Methods Inside Constructor:

// Methods can be defined inside the constructor function, but for performance reasons, it’s better to use prototypes (this will be covered later). 
// For now, here's how you can define methods inside the constructor:

function Dog(breed) {
  this.breed = breed;
  this.bark = function() {
    console.log("Woof! I am a " + this.breed);
  };
}

// 5. Practical Use Cases for Constructor Functions

// Use Case 1: Creating Multiple Users

// You can use constructor functions to create multiple user objects with similar attributes like name, email, and role.

function User(name, email, role) {
  this.name = name;
  this.email = email;
  this.role = role;

  this.getInfo = function() {
    console.log(`User: ${this.name}, Email: ${this.email}, Role: ${this.role}`);
  };
}

let user1 = new User("Alice", "alice@example.com", "admin");
let user2 = new User("Bob", "bob@example.com", "editor");

user1.getInfo();  // Output: User: Alice, Email: alice@example.com, Role: admin
user2.getInfo();  // Output: User: Bob, Email: bob@example.com, Role: editor

// Use Case 2: Modeling Products in a Store
function Product(name, price, category) {
  this.name = name;
  this.price = price;
  this.category = category;

  this.display = function() {
    console.log(`${this.name} costs $${this.price} in ${this.category} category.`);
  };
}

let product1 = new Product("Laptop", 999, "Electronics");
let product2 = new Product("Shoes", 49, "Apparel");

product1.display();  // Output: Laptop costs $999 in Electronics category.
product2.display();  // Output: Shoes costs $49 in Apparel category.

// 6. Constructor Functions vs Factory Functions

// Both constructor functions and factory functions are used to create objects, but there are key differences between them.

// Feature	Constructor Function	Factory Function

// Syntax	Called with new keyword	Regular function call

// this Reference	this refers to the new object	No this; returns an object explicitly

// Inheritance	Can use prototypes for inheritance	Prototypal inheritance requires more setup
// Naming Convention	Typically starts with an uppercase letter	Typically starts with a lowercase letter
// Example	let obj = new Constructor();	let obj = factoryFunction();

// Constructor Example:

function Animal(type) {
  this.type = type;
}

let dog1 = new Animal("Dog");
dog1();
// Factory Function Example:
function createAnimal(type) {
  return { type: type };
}

let dog = createAnimal("Dog");
console.log(dog);

// 7. Practice Exercises

// Exercise 1: Creating a Library System
// Write a constructor function called Book that creates book objects with properties for title, author, and year. Add a method getDetails() that prints out the book's details.

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;

  this.getDetails = function() {
    console.log(`${this.title} by ${this.author}, published in ${this.year}`);
  };
}

let book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
book1.getDetails();  // Output: The Great Gatsby by F. Scott Fitzgerald, published in 1925

// Exercise 2: Creating a Movie Object

// Write a constructor function called Movie that creates movie objects with properties for title, director, and year. Add a method getSummary() that prints out a summary of the movie.

function Movie(title, director, year) {
  this.title = title;
  this.director = director;
  this.year = year;

  this.getSummary = function() {
    console.log(`${this.title}, directed by ${this.director}, released in ${this.year}`);
  };
}

let movie1 = new Movie("Inception", "Christopher Nolan", 2010);
movie1.getSummary();  // Output: Inception, directed by Christopher Nolan, released in 2010

// 8. Summary

// Constructor functions in JavaScript provide a way to create multiple instances of objects with similar properties and methods.

// The new keyword is used to create new objects from constructor functions.

// this inside a constructor function refers to the new object being created.

// Constructor functions are useful for creating multiple objects of the same "type" (e.g., multiple users, products, or books).

// Best practices include naming constructor functions with an uppercase letter, using this correctly, and avoiding explicit return statements.


// 9. Additional Resources
// MDN Web Docs: Constructor Functions
