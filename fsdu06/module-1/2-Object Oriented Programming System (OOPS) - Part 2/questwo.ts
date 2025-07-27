

class PolyDuck{
    fly():void{
        console.log("Duck is flying...");
    }
}

class DesiDuck extends PolyDuck{
    fly(): void {
        console.log("DesiDuck flies at 10kmph");
        
    }
}

class VidesiDuck extends PolyDuck{
    fly(): void {
         console.log("VidesiDuck flies at 20kmph");
    }
}
class SmartDuck extends PolyDuck{
    fly(): void {
        console.log("SmartDuck flies at 50kmph");
    }
}

function makeDuckFly(duck:PolyDuck):void{
    duck.fly();
}


const desiDuck: PolyDuck = new DesiDuck();
const videsiDuck: PolyDuck = new VidesiDuck();
const smartDuck: PolyDuck = new SmartDuck();

makeDuckFly(desiDuck);
makeDuckFly(videsiDuck)
makeDuckFly(smartDuck);



class User{
    public name:string;
    private orgCode:string= "DuckCorp";
    protected role:string;

    constructor(name:string,role:string,){
        this.role=role;
        this.name=name;
    }

    introduce():void{
        console.log(`I am ${this.name} from ${this.orgCode}`);   
    }

}

class Manager extends User{

    constructor(name:string,role:string){
        super(name,role)
    }

    getrole():void{
        console.log(this.role);
    }
}


const user=new User("Daffy", "Employee")
user.introduce();

const manager=new Manager("Donald", "Manager");
// manager.introduce();
manager.getrole();