class Duck {
  swim(): void {
    console.log("I know swimming");
  }
}
class MallardDuck extends Duck {}
const mallard = new MallardDuck();
mallard.swim();

class Bird {
  fly(): void {
    console.log("I can fly");
  }
}
class Penguin extends Bird {
  fly(): void {
    console.log("I cannot fly");
  }
}
const bird = new Bird();
bird.fly();
const penguin = new Penguin();
penguin.fly();


interface IDuck {
  swim(): void;
  fly(): void;
  sound(): void;
}
class ToyDuck implements IDuck {
  swim(): void {
    console.log("Can float on water");
  }
  fly(): void {
    console.log("Cannot fly");
  }
  sound(): void {
    console.log("Cannot sound");
  }
}
const toyDuck = new ToyDuck();
toyDuck.fly();
toyDuck.sound();
toyDuck.swim();
