
class IndianDuck{
    speak(){
        console.log("Quack Quack");
    }

    swim(){
        console.log("Swimming");
    }

    fly(){
        console.log("Flying");
    }
}

class AmericanDuck{
    speak(){
        console.log("Quack Quack");
    }           

    swim(){
        console.log("Swimming");
    }           

    fly(){  
        console.log("Flying");  
    }
}   
// problem is code repetition its good for small code but if we have 100 classes then it will be problem 
// Both the classes have same methods, so we can create a base class and inherit

// solution is using class inheritance
// inheritance is a mechanism where a new class inherits properties and behaviors (methods) from an existing class.
// for resuability and to establish a relationship between classes
class Duck{
    name:string;
    private age:number = 5; // private means can be accessed only within the class
    constructor(name:string){
        this.name = name;
    }
    speak():void{
        console.log("Quack Quack");
        console.log(`Age is: ${this.age}`);
    }
    swim():void{
        console.log("Swimming");
    }
    fly():void{  
        console.log("Flying");
    }
    private secret():void{
        console.log("This is a secret method");
    } // private method can be accessed only within the class can't be accessed by child class
}
// duck extends the properties and methods of the the IndianDuck 
// extends means to inherit the properties and methods of the base class or parent class
class IndianDuck1 extends Duck{
    // can have additional methods or override existing ones

    // additional method 
    // dance is additional method which is not present in the base class
    // dance only accessible to IndianDuck1 class cannot be accessed by Duck class or AmericanDuck1 class
    dance():void{
        console.log("Dancing");
    }

    // overriding existing method
    fly():void{
        console.log("Flying in a unique way");
    } 
}   

class AmericanDuck1 extends Duck{

}

let duck = new Duck("Generic Duck");
duck.speak(); // Quack Quack
duck.swim(); // Swimming
duck.fly();   // Flying
// duck.secret(); // Error: secret is private method


let indianDuck = new IndianDuck1("Indian Duck");
indianDuck.speak(); // Quack Quack
indianDuck.swim(); // Swimming
indianDuck.fly();   // Flying in a unique way
indianDuck.dance(); // Dancing

let americanDuck = new AmericanDuck1('American Duck');
americanDuck.speak(); // Quack Quack
americanDuck.swim(); // Swimming
americanDuck.fly();   // Flying
// americanDuck.dance(); // Error: dance is not a function

// type of inheritance
// single inheritance: A class inherits from one parent class (as shown above)
// multilevel inheritance: A class inherits from a class that is already a child of another class
// example: A -> B -> C (C inherits from B, and B inherits from A)
// multiple inheritance: A class inherits from more than one class (not directly supported in TypeScript/JavaScript, but can be achieved using interfaces or mixins)
// hierarchical inheritance: Multiple classes inherit from a single parent class
// example: A -> B, A -> C (B and C both inherit from A)

// hybrid inheritance: A combination of two or more types of inheritance
// example: A -> B -> C and A -> D (C inherits from B, B inherits from A, and D also inherits from A)
// Note: TypeScript/JavaScript does not support multiple inheritance directly to avoid complexity and ambiguity (like the diamond problem). However, you can achieve similar functionality using interfaces or mixins.

// inheritence have problem like
// 1. Tight Coupling: Inheritance creates a strong coupling between the parent and child classes. Changes in the parent class can inadvertently affect the child classes, leading to unexpected behaviors.
// 2. Fragile Base Class Problem: If the base class is modified, it can break the functionality of derived classes that depend on the original behavior of the base class.
// 3. Inflexibility: Inheritance creates a rigid class hierarchy. Once a class is part of an inheritance chain, it can be difficult to change its position in the hierarchy without affecting other classes.
// 4. Code Bloat: Inheritance can lead to code bloat if many subclasses are created with only slight variations from the parent class.
// 5. Diamond Problem: In languages that support multiple inheritance, a subclass may inherit from two classes that have a common base class, leading to ambiguity about which inherited properties or methods to use.
// 6. Overriding Issues: Subclasses can override methods of the parent class, which can lead to confusion if not managed properly, especially in large codebases.
// 7. Testing Challenges: Testing subclasses can be more complex because they depend on the behavior of their parent classes, making isolated testing difficult.
// 8. Reduced Reusability: Inheritance can limit the reusability of code since subclasses are tightly coupled to their parent classes and may not be easily adaptable to other contexts.
