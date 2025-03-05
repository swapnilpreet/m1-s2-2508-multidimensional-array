// Q: 6
// Title:
// L0 - JSON Stringify Object

console.log("question 1");
let student = {
  name: "Alice",
  age: 22,
  course: "Computer Science",
};

let stringifyOBj = JSON.stringify(student);
console.log(stringifyOBj);

//   Q: 7
//   Title:
//   L0 - Using apply() to Multiply Numbers
console.log("question 2");

const multiply = {
  product: function (number1, number2) {
    return number1 * number2;
  },
};
function multiplyNumbers(number1, number2) {
  return multiply.product.apply(null, [number1, number2]);
}

console.log(multiplyNumbers(4, 4));

// Q: 8
// Title:
// L1 - Using call() to Access Object Properties

const personData = {
  age: 55,
  name: "Swapnil",
};
function personInfo() {
  console.log(this.name, this.age);
}

personInfo.call(personData);

// Q: 9
// Title : L1: Deep vs Shallow copy

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const obj = { name: "Alice", hobbies: ["reading", "traveling"] };

const clonecopy=deepClone(obj);

clonecopy.hobbies.push("coding");

console.log("cloned Obj:",clonecopy)
console.log("original object:",obj);