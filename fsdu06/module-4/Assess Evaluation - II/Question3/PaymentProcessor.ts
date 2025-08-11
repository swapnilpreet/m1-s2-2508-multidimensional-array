import { IPaymentStrategy } from "./IPaymentStrategy";



export class PaymentProcessor{
    private strategy: IPaymentStrategy | null=null;

    setStrategy(strategy:IPaymentStrategy){
        this.strategy=strategy;
    }

    processPayment(details:object,amount:number):void{
        if(!this.strategy){
            console.log("No payment strategy selected");
            return;
        }

        const isValid=this.strategy.validateDetails(details);

        if(isValid){
            this.strategy.pay(amount);
        }else{
            console.log("payment failed due to invalid details")
        }
    }
}