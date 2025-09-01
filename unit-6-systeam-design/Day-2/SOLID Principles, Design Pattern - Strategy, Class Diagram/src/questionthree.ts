class Bird {
  move():void{
    console.log("Bird is moving...");
  }
}
class FlyingBird extends Bird {
  fly():void{
    console.log("Flying...");
  }
}
class NonFlyingBird extends Bird {
  walk():void{
    console.log("Walking...");
  }
}
class Sparrow extends FlyingBird {}
class Ostrich extends NonFlyingBird {}

const sparrow=new Sparrow();
sparrow.fly();
const ostrich=new Ostrich();
ostrich.walk();