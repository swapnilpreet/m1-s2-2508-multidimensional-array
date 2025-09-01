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
