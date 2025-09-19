import { ICoffee } from "./Coffee";

export abstract class CoffeeDecorator implements ICoffee{
    protected coffee : ICoffee;
    constructor (coffee:ICoffee){
        this.coffee=coffee
    }

    abstract getDescription(): string;
    abstract getCost(): number;
}

export class Milk extends CoffeeDecorator{
    getDescription(): string {
        return this.coffee.getDescription()+" with Milk "
    }
    getCost(): number {
        return this.coffee.getCost()+22
    }
}

export class CaramelSyrup extends CoffeeDecorator{
    getDescription(): string {
        return this.coffee.getDescription()+" With CaramelSyrup "
    }
    getCost(): number {
        return this.coffee.getCost()+45
    }
}

