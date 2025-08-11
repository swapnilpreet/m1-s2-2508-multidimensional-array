import { IPaymentStrategy } from "./IPaymentStrategy";



export class PaypalPayment implements IPaymentStrategy{
    private details:any;

    validateDetails(details: object): boolean {
        let {email}=details as any;
        let isvalid= !email && email.includes("@");

        if(isvalid){
            this.details=details;
        }else{
            console.log("Paypal payment validation failed")
        }
        return isvalid;
    }


    pay(amount: number): void {
        let processingfees=amount*2.5/100;
        let fees=amount-processingfees;
        console.log("paid amount is ",fees," with paypal payment method")
    }
}
