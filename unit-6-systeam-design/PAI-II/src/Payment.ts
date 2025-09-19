

export interface PaymentStrategy {
    pay(amount:number):boolean
}

export class CreditCardPayment implements PaymentStrategy{
    private cardnumber:string;

    constructor (cardnumber:string){
        this.cardnumber=cardnumber;
    }
    pay(amount:number):boolean{
        console.log(`payment processing card payment Rs.${amount} using card ${this.cardnumber}`);
        return true;
    }
}

export class DigitalWalletPayment implements PaymentStrategy{
    private DigitalpayID:string;

    constructor(DigitalpayID:string){
        this.DigitalpayID=DigitalpayID
    }

    pay(amount:number):boolean{
        console.log(`payment processing using Digital Wallet Rs. ${amount} using wallet ID ${this.DigitalpayID}`)
        return true;
    }
}

