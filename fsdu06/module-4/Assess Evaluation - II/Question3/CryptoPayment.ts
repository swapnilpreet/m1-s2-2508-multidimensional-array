import { IPaymentStrategy } from "./IPaymentStrategy";


export class CryptoPayment implements IPaymentStrategy{
    private details:any;
    validateDetails(details: object): boolean {
        let {walletAddress}=details as any;

        let isvalid=!walletAddress && walletAddress.length>10;

        if(isvalid){
            this.details=details;
        }else{
            console.log("crypto payment validation failed")
        }
        return isvalid;
    }
    pay(amount: number): void {
        let networdfee=50;
        let total=amount+networdfee;
        console.log("paid amount is ",total,"using Crypto");
    }
}
