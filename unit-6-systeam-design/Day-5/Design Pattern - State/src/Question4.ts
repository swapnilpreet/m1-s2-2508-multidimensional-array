interface ATMState {
  insertCard(atm: ATM): void;
  enterPin(atm: ATM, pin: number): void;
  withdrawCash(atm: ATM, amount: number): void;
}

class IdleStateE implements ATMState {
  insertCard(atm: ATM): void {
    console.log("Card inserted. Please enter your PIN.");
    atm.setState(new CardInsertedState());
  }
  enterPin(atm: ATM, pin: number): void {
    console.log("No card inserted. Insert a card first.");
  }
  withdrawCash(atm: ATM, amount: number): void {
    console.log("No card inserted. Insert a card first.");
  }
}

class CardInsertedState implements ATMState {
  insertCard(atm: ATM): void {
    console.log("Card already inserted.");
  }
  enterPin(atm: ATM, pin: number): void {
    if (pin === atm.correctPin) {
      console.log("PIN correct. You are authenticated.");
      atm.setState(new AuthenticatedState());
    } else {
      console.log("Incorrect PIN. Ejecting card...");
      atm.setState(new IdleStateE());
    }
  }
  withdrawCash(atm: ATM, amount: number): void {
    console.log("Enter PIN first before withdrawing cash.");
  }
}

class AuthenticatedState implements ATMState {
  insertCard(atm: ATM): void {
    console.log("Card already inserted.");
  }
  enterPin(atm: ATM, pin: number): void {
    console.log("PIN already entered.");
  }
  withdrawCash(atm: ATM, amount: number): void {
    if (amount <= atm.balance) {
      console.log(`Withdrawing ₹${amount}...`);
      atm.balance -= amount;
      atm.setState(new DispensingCashState());
      atm.dispenseCash();
    } else {
      console.log("Insufficient balance.");
    }
  }
}

class DispensingCashState implements ATMState {
  insertCard(atm: ATM): void {
    console.log("Please wait. Dispensing cash.");
  }
  enterPin(atm: ATM, pin: number): void {
    console.log("Please wait. Dispensing cash.");
  }
  withdrawCash(atm: ATM, amount: number): void {
    console.log("Please wait. Dispensing cash.");
  }
  finishDispense(atm: ATM): void {
    console.log("Cash dispensed. Returning to Idle.");
    atm.setState(new IdleStateE());
  }
}

class ATM {
  private state: ATMState;
  public balance: number;
  public correctPin: number;
  constructor(balance: number, correctPin: number) {
    this.state = new IdleStateE();
    this.balance = balance;
    this.correctPin = correctPin;
  }
  setState(state: ATMState): void {
    this.state = state;
  }
  insertCard(): void {
    this.state.insertCard(this);
  }
  enterPin(pin: number): void {
    this.state.enterPin(this, pin);
  }
  withdrawCash(amount: number): void {
    this.state.withdrawCash(this, amount);
  }
  dispenseCash(): void {
    if (this.state instanceof DispensingCashState) {
      this.state.finishDispense(this);
    }
  }
}

const atm = new ATM(1000, 1234);

atm.withdrawCash(500);
atm.insertCard();
atm.enterPin(1111);
atm.insertCard(); 
atm.enterPin(1234);
atm.withdrawCash(700);   
atm.insertCard();
