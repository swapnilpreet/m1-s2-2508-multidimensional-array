
export interface IPaymentStrategy{
    pay(amount:number):void;
    validateDetails(details:object):boolean;
}