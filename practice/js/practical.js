


//  6 main ways to create an object 

// 1 object literal

  const obj={
    name:"Swapnil",
    city:"nagpur",
  } 

// 2 new Objet() Constructor:
  const person4 = new Object();
  person4.name="swapnil";
  person4.cith="Nagpur";

//  using constructor function 

  function Person2(name,city){
    this.name=name;
    this.city=city;
  }
  const person1=new Person2("swapnil","Nagpur");

// constructor class es6
  class Person1 {
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
  }
  const person2=new Person1("Alice",25);

// objecct create

const proto={
    greet(){
        console.log("Hellow")
    }
}
const person3=Object.create(proto);
person3.name="swapnil";

// using factory function:
    function createPerson(name,age){
        return {
            name,age,
            greet(){
                console.log(`Hi im ${swapnil}`);
            }
        }
    }
    const person=createPerson("swapnil",45);


class Car{
    constructor(name,city){
        this.name=name,
        this.city=city
    }

    greet(){
        return `inside car,${this.name},${this.city}`
    }
}

const newcar=new Car("swapnil","nagpur");

// console.log("instance ",newcar)
// console.log("instance ",newcar.greet())

// IIFE
(function() {
    console.log("This runs immediately!");
})(); // Output: This runs immediately!

// constructor function 
function CarCreation(brand,model){
    this.brand=brand;
    this.model=model;
    this.drive=function(){
        console.log(`${this.brand}, ${this.model} is driving..`)
    }
}
// creating instances based on consvruction fn
const c1Creation=new CarCreation("toyata","fortuner");
console.log(c1Creation);
c1Creation.drive();

// create a factory fn

function CreateUser(username,city){
    return {
        username,city,
        talk(){
            console.log(`${username} ${city} its me`)
        }
    }
}

const user1=CreateUser("swapnil","ngp");
console.log(user1)
user1.talk();



// console.log("null", typeof {} == typeof null)


// console.log("start");
// const timeoutId= setTimeout(()=>{
//     console.log("inside");
   
// },2000)
// clearTimeout(timeoutId);
// console.log(timeoutId);
// console.log("end");


function outer(){
    let count=0;

    return function inner(){
        count++;
        console.log('counting..',count)
    }
}

const Counter=outer();

console.log(Counter.count)
Counter();
Counter();
Counter();
Counter();

// let abcd=4
console.log(typeof abcd)

let arr=[1,2,4,5,6,8]
let twidigitarr=[11,44,22,55,88,66,21,50,515,502];

    arr.sort((a,b)=>b-a)
    console.log("sorted",arr);

    twidigitarr.sort()
    console.log(twidigitarr)
    twidigitarr.sort((a,b)=>a-b);
    console.log(twidigitarr)

    let arrandobj=[
        {name:"swa",age:12},
        {name:"hri",age:55},
        {name:"swa-2",age:120},
        {name:"hri-2",age:550}
    ]

    arrandobj.sort((a,b)=>b.age-a.age)

    console.log(arrandobj)


    // hof fn that do certain task 
    function repeatprint(print,timer){
        for(let i=0;i<timer;i++){
            print("i",i)
        }
    }
    repeatprint(console.log,3)