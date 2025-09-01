"use strict";
class Duck {
    swim() {
        console.log("I know swimming");
    }
}
class MallardDuck extends Duck {
}
const mallard = new MallardDuck();
mallard.swim();
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
const bird = new Bird();
bird.fly();
const penguin = new Penguin();
penguin.fly();
class ToyDuck {
    swim() {
        console.log("Can float on water");
    }
    fly() {
        console.log("Cannot fly");
    }
    sound() {
        console.log("Cannot sound");
    }
}
const toyDuck = new ToyDuck();
toyDuck.fly();
toyDuck.sound();
toyDuck.swim();
