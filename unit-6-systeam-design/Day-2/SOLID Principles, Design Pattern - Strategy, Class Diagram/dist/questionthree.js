"use strict";
class Bird {
    move() {
        console.log("Bird is moving...");
    }
}
class FlyingBird extends Bird {
    fly() {
        console.log("Flying...");
    }
}
class NonFlyingBird extends Bird {
    walk() {
        console.log("Walking...");
    }
}
class Sparrow extends FlyingBird {
}
class Ostrich extends NonFlyingBird {
}
const sparrow = new Sparrow();
sparrow.fly();
const ostrich = new Ostrich();
ostrich.walk();
