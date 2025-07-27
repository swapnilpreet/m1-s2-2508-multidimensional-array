// Common Bird class
class Bird {
    eat(): void {
        console.log("Eating...");
    }
}
 
interface Flyable {
    fly(): void;
}

class Sparrow extends Bird implements Flyable {
    fly(): void {
        console.log("Flying...");
    }
}

class Ostrich extends Bird {
    // No fly() method because it can't fly
}


const sparrow: Flyable = new Sparrow();
sparrow.fly();

const ostrich: Bird = new Ostrich();
// ostrich.fly(); 
