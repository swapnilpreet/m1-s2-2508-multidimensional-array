
interface ShippingStrategy{
    calculate():number;
}

class StandardShipping implements ShippingStrategy{
    public calculate(): number {
        return 50;
    }
}
class ExpressShipping implements ShippingStrategy {
    public calculate(): number {
        return 100;
    }
}

class Shipping{
    private strategy: ShippingStrategy;

    constructor(strategy:ShippingStrategy){
        this.strategy=strategy;
    }

    public setStrategy(strategy:ShippingStrategy):void{
        this.strategy=strategy;
    }

    public calculateCost():number{
        return this.strategy.calculate();
    }
}

const shipping = new Shipping(new StandardShipping());
console.log("Standard Shipping:", shipping.calculateCost());

shipping.setStrategy(new ExpressShipping());
console.log("Express Shipping:", shipping.calculateCost());