

export interface ICoffee{
    getDescription():void;
    getCost():number;
}
export class Espresso implements ICoffee{
    getCost(): number {
        return 150;
    }
    getDescription(): string {
        return "Espresso "
    }
}
export class Latte implements ICoffee{
    getDescription(): string {
        return "Lattle ";
    }
    getCost(): number {
        return 100;
    }
}

