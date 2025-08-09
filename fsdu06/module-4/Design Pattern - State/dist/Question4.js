"use strict";
class ATM {
    constructor() {
        this.idleState = new IdleStateI(this);
        this.cardInsertedState = new CardInsertedState(this);
        this.authenticatedState = new AuthenticatedState(this);
        this.dispensingCashState = new DispensingCashState(this);
        this.currentState = this.idleState;
    }
    setState(state) {
        this.currentState = state;
    }
    insertCard() {
        this.currentState.insertCard();
    }
    enterPin(pin) {
        this.currentState.enterPin(pin);
    }
    withdrawCash(amount) {
        this.currentState.withdrawCash(amount);
    }
}
class IdleStateI {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        console.log("Card inserted. Please enter your PIN.");
        this.atm.setState(this.atm.cardInsertedState);
    }
    enterPin(pin) {
        console.log("Please insert card first.");
    }
    withdrawCash(amount) {
        console.log("Please insert card first.");
    }
}
class CardInsertedState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        console.log("Card already inserted.");
    }
    enterPin(pin) {
        if (pin === 1234) {
            console.log("PIN correct. You can withdraw cash now.");
            this.atm.setState(this.atm.authenticatedState);
        }
        else {
            console.log("Incorrect PIN. Card ejected.");
            this.atm.setState(this.atm.idleState);
        }
    }
    withdrawCash(amount) {
        console.log("Enter PIN before withdrawing cash.");
    }
}
class AuthenticatedState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        console.log("Transaction in progress.");
    }
    enterPin(pin) {
        console.log("Already authenticated.");
    }
    withdrawCash(amount) {
        console.log(`Withdrawing ${amount}...`);
        this.atm.setState(this.atm.dispensingCashState);
        this.atm.withdrawCash(amount);
    }
}
class DispensingCashState {
    constructor(atm) {
        this.atm = atm;
    }
    insertCard() {
        console.log("Please wait, dispensing cash.");
    }
    enterPin(pin) {
        console.log("Please wait, dispensing cash.");
    }
    withdrawCash(amount) {
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
