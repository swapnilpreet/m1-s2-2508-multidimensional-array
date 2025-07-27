

interface FlyStrategy{
    fly():void;
}

class NewDuck{
    private flyStrategy:FlyStrategy;

    constructor(flyStrategy: FlyStrategy){
         this.flyStrategy = flyStrategy;
    }

    public performFly(): void{
        this.flyStrategy.fly();
    }

    public setFlyStrategy(flyStrategy: FlyStrategy): void {
        this.flyStrategy = flyStrategy;
    }
}


class FastFly implements FlyStrategy{
    public fly(): void {
        console.log("Flying fast like a rocket!");
    }
}

class NoFly implements FlyStrategy{
    public fly(): void {
        console.log("I cannot fly");
    }
}



const duckSim: NewDuck = new NewDuck(new FastFly());
duckSim.performFly();

duckSim.setFlyStrategy(new NoFly());
duckSim.performFly();