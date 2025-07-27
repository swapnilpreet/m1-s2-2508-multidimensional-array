"use strict";
class PolyDuck {
    fly() {
        console.log("Duck is flying...");
    }
}
class DesiDuck extends PolyDuck {
    fly() {
        console.log("DesiDuck flies at 10kmph");
    }
}
class VidesiDuck extends PolyDuck {
    fly() {
        console.log("VidesiDuck flies at 20kmph");
    }
}
class SmartDuck extends PolyDuck {
    fly() {
        console.log("SmartDuck flies at 50kmph");
    }
}
function makeDuckFly(duck) {
    duck.fly();
}
const desiDuck = new DesiDuck();
const videsiDuck = new VidesiDuck();
const smartDuck = new SmartDuck();
makeDuckFly(desiDuck);
makeDuckFly(videsiDuck);
makeDuckFly(smartDuck);
class User {
    constructor(name, role) {
        this.orgCode = "DuckCorp";
        this.role = role;
        this.name = name;
    }
    introduce() {
        console.log(`I am ${this.name} from ${this.orgCode}`);
    }
}
class Manager extends User {
    constructor(name, role) {
        super(name, role);
    }
    getrole() {
        console.log(this.role);
    }
}
const user = new User("Daffy", "Employee");
user.introduce();
const manager = new Manager("Donald", "Manager");
// manager.introduce();
manager.getrole();
