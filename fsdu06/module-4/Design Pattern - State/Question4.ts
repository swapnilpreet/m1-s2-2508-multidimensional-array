
interface ATMState {
  insertCard(): void;
  enterPin(pin: number): void;
  withdrawCash(amount: number): void;
}

class ATM {
  idleState: ATMState;
  cardInsertedState: ATMState;
  authenticatedState: ATMState;
  dispensingCashState: ATMState;
  currentState: ATMState;

  constructor() {
    this.idleState = new IdleStateI(this);
    this.cardInsertedState = new CardInsertedState(this);
    this.authenticatedState = new AuthenticatedState(this);
    this.dispensingCashState = new DispensingCashState(this);
    this.currentState = this.idleState;
  }

  setState(state: ATMState) {
    this.currentState = state;
  }

  insertCard() {
    this.currentState.insertCard();
  }

  enterPin(pin: number) {
    this.currentState.enterPin(pin);
  }

  withdrawCash(amount: number) {
    this.currentState.withdrawCash(amount);
  }
}


class IdleStateI implements ATMState {
  constructor(private atm: ATM) {}
  insertCard() {
    console.log("Card inserted. Please enter your PIN.");
    this.atm.setState(this.atm.cardInsertedState);
  }
  enterPin(pin: number) {
    console.log("Please insert card first.");
  }
  withdrawCash(amount: number) {
    console.log("Please insert card first.");
  }
}


class CardInsertedState implements ATMState {
  constructor(private atm: ATM) {}
  insertCard() {
    console.log("Card already inserted.");
  }
  enterPin(pin: number) {
    if (pin === 1234) {
      console.log("PIN correct. You can withdraw cash now.");
      this.atm.setState(this.atm.authenticatedState);
    } else {
      console.log("Incorrect PIN. Card ejected.");
      this.atm.setState(this.atm.idleState);
    }
  }
  withdrawCash(amount: number) {
    console.log("Enter PIN before withdrawing cash.");
  }
}


class AuthenticatedState implements ATMState {
  constructor(private atm: ATM) {}
  insertCard() {
    console.log("Transaction in progress.");
  }
  enterPin(pin: number) {
    console.log("Already authenticated.");
  }
  withdrawCash(amount: number) {
    console.log(`Withdrawing ${amount}...`);
    this.atm.setState(this.atm.dispensingCashState);
    this.atm.withdrawCash(amount); 
  }
}


class DispensingCashState implements ATMState {
  constructor(private atm: ATM) {}
  insertCard() {
    console.log("Please wait, dispensing cash.");
  }
  enterPin(pin: number) {
    console.log("Please wait, dispensing cash.");
  }
  withdrawCash(amount: number) {
    console.log(`Cash dispensed: ${amount}`);
    console.log("Transaction complete. Returning to idle state.");
    this.atm.setState(this.atm.idleState); 
  }
}

const atm = new ATM();
atm.insertCard();
atm.enterPin(1234);
atm.withdrawCash(500);
atm.insertCard();
