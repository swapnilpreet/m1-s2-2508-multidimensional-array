// console.log("swa")

// Q: 11
// Title:
// L0 - Basic Closure Example

function outerFunction() {
  let message = "swapnil";

  return function innerFunction() {
    console.log(message);
  };
}

let recivefn = outerFunction();
recivefn();

// Q: 12
// Title:
// L0 - Data Privacy using Closures

function createCounter() {
  let count = 0;
  return {
    increment: function () {
      count++;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}
// console.log(count) // error

const counter = createCounter();

console.log(counter.increment()); // Output: 1;

console.log(counter.increment()); // Output: 2;

console.log(counter.getCount()); // Output: 2;

// Q: 13
// Title:
// L1 - Encapsulating Bank Account using Closures

function createBankAccount(bal) {
  let balance = bal;
  return {
    deposit: function (amt) {
      balance += amt;
      return balance;
    },
    withdraw: function (amt) {
      return (balance = balance - amt);
    },
    getBalance: function () {
      return balance;
    },
  };
}

const account = createBankAccount(100);

console.log(account.deposit(50)); // Output: 150

console.log(account.withdraw(30)); // Output: 120

console.log(account.getBalance()); // Output: 120

// Q: 14
// Title:
// L1 - Debugging Incorrect Closure Value Retention

function createFunctionList() {
  let functions = [];

  for (let i = 0; i < 5; i++) {
    functions.push(function () {
      console.log("Index:", i);
    });
  }

  return functions;
}

const functionList = createFunctionList();

functionList[0](); // Expected Output: "Index: 0", Actual Output: "Index: 5"

functionList[1](); // Expected Output: "Index: 1", Actual Output: "Index: 5"

functionList[2](); // Expected Output: "Index: 2", Actual Output: "Index: 5"

functionList[3](); // Expected Output: "Index: 3", Actual Output: "Index: 5"

functionList[4](); // Expected Output: "Index: 4", Actual Output: "Index: 5"

// Q: 15
// Title:
// L2 - Debugging Memory Leak in Closures

function createHeavyDataHandler() {
  var largeData = new Array(1000000).fill(0); // Large data array

  return {
    processData: function () {
      console.log("Processing data of size:", largeData.length);
    },

    clearData: function () {
      console.log("Clearing data");

      largeData = null;
    },
  };
}

const handler = createHeavyDataHandler();

handler.processData(); // Output: Processing data of size: 1000000
handler.clearData();    // Output: Clearing data

// Despite clearing the data, memory usage remains high. Why is that?