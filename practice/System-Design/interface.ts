

// interface is contract which defines the structure of an object

interface IDuck {
    fly(): void;
    swim(): void;
    speak(): void;
}

class NewIndianDuck implements IDuck {
    fly(): void {
        console.log("Flying");
    }   
    swim(): void {
        console.log("Swimming");
    }

    speak(): void {
        console.log("Quack Quack");
    }
}

let newIndianDuck = new NewIndianDuck();
newIndianDuck.fly();// Flying
newIndianDuck.swim();// Swimming
newIndianDuck.speak();// Quack Quack
