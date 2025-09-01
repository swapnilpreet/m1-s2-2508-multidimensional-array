"use strict";
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
