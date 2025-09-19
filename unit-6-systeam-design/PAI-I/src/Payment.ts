export interface PaymentStrategy {
  pay(amount: number): boolean;
}

export class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;
  constructor(cardNumber: string) {
    this.cardNumber = cardNumber;
  }
  pay(amount: number): boolean {
    console.log(`Processing credit card payment of ${amount} using card ${this.cardNumber}`);
    return true;
  }
}

export class DigitalWalletPayment implements PaymentStrategy {
  private walletId: string;
  constructor(walletId: string) {
    this.walletId = walletId;
  }
  pay(amount: number): boolean {
    console.log(`Processing wallet payment of ${amount} using wallet ${this.walletId}`);
    return true;
    }
}