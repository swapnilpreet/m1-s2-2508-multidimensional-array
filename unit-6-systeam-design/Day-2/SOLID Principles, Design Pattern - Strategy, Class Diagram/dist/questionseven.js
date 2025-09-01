"use strict";
class Animal {
    makeSound() {
        console.log("Some sound");
    }
}
class Dog extends Animal {
    makeSound() {
        console.log("Bark!");
    }
}
function makeAnimalSound(animal) {
    animal.makeSound();
}
const genericAnimal = new Animal();
const dog = new Dog();
makeAnimalSound(genericAnimal);
makeAnimalSound(dog);
