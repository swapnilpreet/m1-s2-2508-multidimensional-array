import { IPaymentStrategy } from "./IPaymentStrategy";


export class CreaditCardPayment implements IPaymentStrategy{
    private details:any;

    validateDetails(details: object): boolean {
        let {carNumber,expiryDate,cvv}=details as any;

        let isValid= !!carNumber && !!expiryDate && !!cvv;

        if(isValid){
            this.details=details
        }else{
            console.log("creadit card validation failed , missing details")
        }
        return isValid;
    }

    pay(amount: number): void {
        let processfees=amount*1.5/100;
        let fees=amount-processfees;

        let totalamount=amount+fees;
        console.log("paid amount is", totalamount, "with creadit card")
    }
}