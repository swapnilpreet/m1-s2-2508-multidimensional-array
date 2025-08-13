//  6 main ways to create an object

// 1 object literal

const obj = {
  name: "Swapnil",
  city: "nagpur",
};

// 2 new Objet() Constructor:
const person4 = new Object();
person4.name = "swapnil";
person4.cith = "Nagpur";

//  using constructor function

function Person2(name, city) {
  this.name = name;
  this.city = city;
}
const person1 = new Person2("swapnil", "Nagpur");

// constructor class es6
class Person1 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const person2 = new Person1("Alice", 25);

// objecct create

const proto = {
  greet() {
    console.log("Hellow");
  },
};
const person3 = Object.create(proto);
person3.name = "swapnil";

// using factory function:
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi im ${swapnil}`);
    },
  };
}
const person = createPerson("swapnil", 45);

class Car {
  constructor(name, city) {
    (this.name = name), (this.city = city);
  }

  greet() {
    return `inside car,${this.name},${this.city}`;
  }
}

const newcar = new Car("swapnil", "nagpur");

// console.log("instance ",newcar)
// console.log("instance ",newcar.greet())

// IIFE
(function () {
  console.log("This runs immediately!");
})(); // Output: This runs immediately!

// constructor function
function CarCreation(brand, model) {
  this.brand = brand;
  this.model = model;
  this.drive = function () {
    console.log(`${this.brand}, ${this.model} is driving..`);
  };
}
// creating instances based on consvruction fn
const c1Creation = new CarCreation("toyata", "fortuner");
console.log(c1Creation);
c1Creation.drive();

// create a factory fn

function CreateUser(username, city) {
  return {
    username,
    city,
    talk() {
      console.log(`${username} ${city} its me`);
    },
  };
}

const user1 = CreateUser("swapnil", "ngp");
console.log(user1);
user1.talk();

// console.log("null", typeof {} == typeof null)

// console.log("start");
// const timeoutId= setTimeout(()=>{
//     console.log("inside");

// },2000)
// clearTimeout(timeoutId);
// console.log(timeoutId);
// console.log("end");

// function outer() {
//   let count = 0;

//   return function inner() {
//     count++;
//     console.log("counting..", count);
//   };
// }

// const Counter = outer();

// console.log(Counter.count);
// Counter();
// Counter();
// Counter();
// Counter();

// // let abcd=4
// console.log(typeof abcd);

// let arr = [1, 2, 4, 5, 6, 8];
// let twidigitarr = [11, 44, 22, 55, 88, 66, 21, 50, 515, 502];

// arr.sort((a, b) => b - a);
// console.log("sorted", arr);

// twidigitarr.sort();
// console.log(twidigitarr);
// twidigitarr.sort((a, b) => a - b);
// console.log(twidigitarr);

// let arrandobj = [
//   { name: "swa", age: 12 },
//   { name: "hri", age: 55 },
//   { name: "swa-2", age: 120 },
//   { name: "hri-2", age: 550 },
// ];

// arrandobj.sort((a, b) => b.age - a.age);

// console.log(arrandobj);

// // hof fn that do certain task
// function repeatprint(print, timer) {
//   for (let i = 0; i < timer; i++) {
//     print("i", i);
//   }
// }
// repeatprint(console.log, 3);

// function greet(message, punctuation) {
//   console.log(`${message}, ${this.name} ${punctuation}`);
// }

// const newuser1 = { name: "swapnil" };
// const newuser2 = { name: "hritik" };

// greet.call(newuser1, "hellow", "!");
// greet.call(newuser2, "Hii", "!");
// let Alluser = [{ name: "swapnil" }, { name: "hritik" }];

// for (let i = 0; i < Alluser.length; i++) {
//   greet.call(Alluser[i], "Hello", "!");
// }

// console.log("start");
// setTimeout(() => {
//   console.log("from inside async");
// }, 2000);
// console.log("end");

// async function fetchData() {
//   try {
//     console.log("fetch inside start")
//     let response = await fetch("https://jsonplaceholder.typicode.com/post/1");
//     if (response.statusText === "OK") {
//       console.log("fetch data", response);
//     } else {
//       throw new Error("tech failed to get data");
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
//   console.log("fetch inside end")
// }

// console.log("fetch started");
// fetchData();
// console.log("fetch ended");

// let promise = new Promise((resolve, reject) => {
//   try {
//     if("x"==5){
//         return resolve();
//     }else{
//         throw new Error("promise failed")
//     }
//   } catch (err) {
//     // console.log("promise err", err);
//     return reject(err);
//   }
// });

// promise
//   .then(() => console.log("promise yes"))
//   .catch((err) => {
//     console.log(err);
//   });


// function faactory(nameuser){
//   return {
//     nameuser,
//     greet(){
//       console.log("hii from faactory fn",nameuser)
//     }
//   }
// }

// let user=faactory("swapnil");
// user.greet()
// console.log(user);


// class Animal{
//     eat(){
//       console.log("Eating....")
//     }
// }

// class Dog extends Animal{
//   bark(){
//     console.log("barking...")
//   }
// }

// let newDog=new Dog();
// newDog.eat();
// newDog.bark();



class setprofile{
  #age;
  constructor(name,age){
    this.name=name;
    this.#age=age;
  }

  getage(){
    console.log("Getting age",this.#age)
  }

  setAge(newage){
    if(newage>18 && newage<30){
      this.#age=newage
      console.log("Setting age",this.#age)
    }
  }
}

let newuser=new setprofile('swapnil',18);
console.log(newuser.getage());
console.log(newuser.setAge(55));
