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
