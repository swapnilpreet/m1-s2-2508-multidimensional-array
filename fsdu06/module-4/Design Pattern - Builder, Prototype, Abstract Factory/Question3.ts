
class Car{
    private brand:string;
    private engine:string;
    private color:string;
    private sunroof:boolean;
    private automatictransmission:boolean;

    constructor(brand:string,engine:string,color:string,sunroof:boolean,automatictransmission:boolean){
        this.brand=brand;
        this.engine=engine;
        this.color=color;
        this.sunroof=sunroof;
        this.automatictransmission=automatictransmission;
    }

    getDetails():string{
        return `Your Car Details brand:${this.brand} with an ${this.engine} engine, ${this.color} color, Sunroof: ${this.sunroof ? "Yes" :"No"} and Automatic transmission ${this.automatictransmission ? "Yes " : "No"}`
    }
}

class CarBuilder{
    private brand:string="Nexa";
    private engine:string="petrol engine";
    private color:string="red color";
    private sunroof:boolean=false;
    private automatictransmission:boolean=false;

    setbrand(brand:string):this{
        this.brand=brand;
        return this;
    }
    setEngine(engine:string):this{
        this.engine=engine;
        return this;
    }

    setColor(color:string):this{
        this.color=color;
        return this;
    }

    setSunroof():this{
        this.sunroof=true;
        return this;
    }

    setAutomatic():this{
        this.automatictransmission=true;
        return this;
    }

    build():Car{
        return new Car(this.brand,this.engine,this.color,this.sunroof,this.automatictransmission)
    }
}


function main3():void{
    let newCar = new CarBuilder()
    .setbrand("Tesla")
    .setEngine("electric")
    .setColor('red')
    .setSunroof()
    .setAutomatic()
    .build()

    console.log(newCar.getDetails())
}
main3()