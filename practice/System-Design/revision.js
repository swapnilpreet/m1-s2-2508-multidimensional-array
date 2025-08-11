// Method-1 : Wthout classes : just using variables
let name1= "Venu";
let interest1 = "Backend";

let name2 = "Dinkar";
let interest2 = "Data Analysis";

let name3 = "Ankit";
let interest3 = "Data Stucture";
// Limitation : This method is okay for a small amount of data, but as your app grows, it becomes cumbersome and inefficient.

//Method-2 : using JS object
// Repeating structure manually
let person1 = {
  name: "Venu",
  interest: "Backend",
  introduce: function () {
    console.log(`Hi, I'm ${this.name} and I like ${this.interest}.`);
  },
};

let person2 = {
  name: "Dinkar",
  interest: "Data Analysis",
  introduce: function () {
    console.log(`Hi, I'm ${this.name} and I like ${this.interest}.`);
  },
};

person1.introduce(); // Hi, I'm Venu and I like Backend.
person2.introduce(); // Hi, I'm Dinkar and I like Data Analysis.

// Limitation :While using objects is an improvement over variables, you still lack a reusable template for creating and managing people efficiently.

// 🔴 Problems:
// Duplicated method code
// No template
// Easy to miss fields or introduce typos

// Method-3 using JS Prototypes
function Person(name, interest) {
  this.name = name;
  this.interest = interest;
}

Person.prototype.introduce = function () {
  console.log(`Hi, I'm ${this.name} and I like ${this.interest}.`);
};

let person1 = new Person("Venu", "Backend");
let person2 = new Person("Dinkar", "Data Analysis");

person1.introduce(); // Hi, I'm Venu and I like Backend.
person2.introduce(); // Hi, I'm Dinkar and I like Data Analysis.

// Improvements:
// Shared method via prototype
// Efficient memory usage
// ⚠️ Limitations:
// Verbose and lower readability
// No type safety
// Beginners may find it unintuitive

// You can use Class to create as many objects as you want
// ✅ Benefits:
// Clean syntax
// Type safety (in TypeScript)
// Easy to scale
// IDE support (autocomplete, refactoring)



// 2.1 Need -> Coding of Inheritance
// class with methods (swim, sound, fly)
class IndianDuck{
    swim():void{
        console.log("I know siwmming");
    }

    sound():void{
        console.log("Quack!! Quack!!");
    }

    fly():void{
        console.log("I fly at 10 kmph");
    }

}

// class with methods (swim, sound, fly)
class AmericanDuck{
    swim():void{
        console.log("I know siwmming");
    }

    sound():void{
        console.log("Quack!! Quack!!");
    }

    fly():void{
        console.log("I fly at 5kmph");
    }
}

// Now user want to create a new class of AfricanDuck. But there is problem 
// with this approach. What is it?
// Duplication of Efforts : You have to 
// What is the solution?


// Solution is Inheritance

// Parent class
class Duck{

    swim():void{
        console.log("I know siwmming");
    }

    sound():void{
        console.log("Quack!! Quack!!");
    }
    
    fly():void{
        console.log("I fly at xkmph");
    }
}

//Child class
class IndianDuck extends Duck{

}

//Child class
class AmericanDuck extends Duck{

}

let indianDuck = new IndianDuck();
indianDuck.sound();
indianDuck.swim();
indianDuck.fly();

// child class
class AfricanDuck extends Duck{
fly():void{
        console.log("I fly at 15kmph");
    }
}