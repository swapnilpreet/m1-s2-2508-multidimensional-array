"use strict";
class NewDuck {
    constructor(flyStrategy) {
        this.flyStrategy = flyStrategy;
    }
    performFly() {
        this.flyStrategy.fly();
    }
    setFlyStrategy(flyStrategy) {
        this.flyStrategy = flyStrategy;
    }
}
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
const duckSim = new NewDuck(new FastFly());
duckSim.performFly();
duckSim.setFlyStrategy(new NoFly());
duckSim.performFly();
