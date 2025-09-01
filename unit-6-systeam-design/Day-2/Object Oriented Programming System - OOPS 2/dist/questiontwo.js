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
makeDuckFly(new DesiDuck());
makeDuckFly(new VidesiDuck());
makeDuckFly(new SmartDuck());
class User {
    constructor(name, role) {
        this.orgCode = "DuckCorp";
        this.name = name;
        this.role = role;
    }
    introduce() {
        console.log(`I am ${this.name} from ${this.orgCode}`);
    }
}
class Manager extends User {
    getRole() {
        console.log(this.role);
    }
}
const user = new User("Daffy", "Employee");
user.introduce();
const manager = new Manager("Donald", "Manager");
manager.introduce();
manager.getRole();
