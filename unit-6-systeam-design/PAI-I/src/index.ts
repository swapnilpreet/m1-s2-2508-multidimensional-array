import { Latte } from "./Coffee";
import { CaramelSyrup, Milk } from "./CoffeeDecorator";

function main (){
    let lattle = new Latte();
    const decorated=new Milk(new CaramelSyrup(lattle))
    console.log(decorated.getCost())
    console.log(decorated.getDescription())
}

main()