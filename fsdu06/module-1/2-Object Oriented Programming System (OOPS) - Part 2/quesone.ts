

class Duck{
    swim():void{
        console.log("I know swimming");
        
    }
}

class MallardDuck extends Duck{
}

const newDuck=new MallardDuck();
newDuck.swim();



class Bird{
    fly():void{
        console.log("I can fly");
    }
}

class Penguin extends Bird{
    fly(): void {
        console.log("I cannot fly");
    }
}

const newbirdone=new Bird();
const newbirdtwo=new Penguin();

newbirdone.fly()
newbirdtwo.fly();


interface IDuck{
    swim():void;
    fly():void;
    sound():void;
}


class toyDuck implements IDuck{
    fly(): void {
        console.log("Cannot fly");
        
    }

    sound(): void {
        console.log("Cannot sound");
        
    }
    swim(): void {
        console.log("Can float on water");
        
    }
}

const duck=new toyDuck();
duck.fly();
duck.sound();
duck.swim();
