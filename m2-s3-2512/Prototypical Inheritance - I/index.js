// Q: 8
// Title
// Prototypes and Prototypical Inheritance Syntax Practice


function  Animal() {
    this.type = 'Animal';
}
Animal.prototype.sound = function () {
    console.log("Animal sound")
}
function Dog() {
    Animal.call(this)
}
Dog.prototype=new Animal();
Dog.prototype.sound=function () {
    console.log("Bark")
}
let myDog = new Dog();
myDog.sound();


// Q: 9
// Problem:
// Title
// Basic Person Management System with Prototypical Inheritance


function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.introduce = function () {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old`)
}
function Employee(name, age,jobTitle) {
    Person.call(this,name,age)
    this.jobTitle=jobTitle
}
Employee.prototype=new Person();

Employee.prototype.work=function(){
    console.log(`${this.name} is working as a ${this.jobTitle}`)
}

let person1 = new Person("swapnil",55);
let employee1 = new Employee("preet",30,"sde");
person1.introduce();
employee1.introduce();
employee1.work();

