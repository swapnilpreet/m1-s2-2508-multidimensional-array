"use strict";
// Common Bird class
class Bird {
    eat() {
        console.log("Eating...");
    }
}
class Sparrow extends Bird {
    fly() {
        console.log("Flying...");
    }
}
class Ostrich extends Bird {
}
const sparrow = new Sparrow();
sparrow.fly();
const ostrich = new Ostrich();
// ostrich.fly(); 
