"use strict";
class Duck {
    swim() {
        console.log("I know swimming");
    }
}
class MallardDuck extends Duck {
}
const newDuck = new MallardDuck();
newDuck.swim();
class Bird {
    fly() {
        console.log("I can fly");
    }
}
class Penguin extends Bird {
    fly() {
        console.log("I cannot fly");
    }
}
const newbirdone = new Bird();
const newbirdtwo = new Penguin();
newbirdone.fly();
newbirdtwo.fly();
class toyDuck {
    fly() {
        console.log("Cannot fly");
    }
    sound() {
        console.log("Cannot sound");
    }
    swim() {
        console.log("Can float on water");
    }
}
const duck = new toyDuck();
duck.fly();
duck.sound();
duck.swim();
