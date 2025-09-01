"use strict";
class FastFly {
    fly() {
        console.log("Flying fast like a rocket!");
    }
}
class NoFly {
    fly() {
        console.log("I cannot fly");
    }
}
class NewDuck {
    constructor(flyStrategy) {
        this.flyStrategy = flyStrategy;
    }
    performFly() {
        this.flyStrategy.fly();
    }
    setFlyStrategy(strategy) {
        this.flyStrategy = strategy;
    }
}
const duck = new NewDuck(new FastFly());
duck.performFly();
duck.setFlyStrategy(new NoFly());
duck.performFly();
