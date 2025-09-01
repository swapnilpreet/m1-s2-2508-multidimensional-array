"use strict";
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
