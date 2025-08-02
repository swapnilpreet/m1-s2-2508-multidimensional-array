"use strict";
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    makeSound() {
        console.log(`${this.name} says Woof!`);
    }
}
class Cat extends Animal {
    makeSound() {
        console.log(`${this.name} says Meow!`);
    }
}
const animals = [
    new Dog("Buddy"),
    new Cat("Whiskers")
];
for (let eachanimal of animals) {
    eachanimal.makeSound();
}
