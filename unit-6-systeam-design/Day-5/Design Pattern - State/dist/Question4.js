"use strict";
class IdleStateE {
    insertCard(atm) {
        console.log("Card inserted. Please enter your PIN.");
        atm.setState(new CardInsertedState());
    }
    enterPin(atm, pin) {
        console.log("No card inserted. Insert a card first.");
    }
    withdrawCash(atm, amount) {
        console.log("No card inserted. Insert a card first.");
    }
}
class CardInsertedState {
    insertCard(atm) {
        console.log("Card already inserted.");
    }
    enterPin(atm, pin) {
        if (pin === atm.correctPin) {
            console.log("PIN correct. You are authenticated.");
            atm.setState(new AuthenticatedState());
        }
        else {
            console.log("Incorrect PIN. Ejecting card...");
            atm.setState(new IdleStateE());
        }
    }
    withdrawCash(atm, amount) {
        console.log("Enter PIN first before withdrawing cash.");
    }
}
class AuthenticatedState {
    insertCard(atm) {
        console.log("Card already inserted.");
    }
    enterPin(atm, pin) {
        console.log("PIN already entered.");
    }
    withdrawCash(atm, amount) {
        if (amount <= atm.balance) {
            console.log(`Withdrawing ₹${amount}...`);
            atm.balance -= amount;
            atm.setState(new DispensingCashState());
            atm.dispenseCash();
        }
        else {
            console.log("Insufficient balance.");
        }
    }
}
class DispensingCashState {
    insertCard(atm) {
        console.log("Please wait. Dispensing cash.");
    }
    enterPin(atm, pin) {
        console.log("Please wait. Dispensing cash.");
    }
    withdrawCash(atm, amount) {
        console.log("Please wait. Dispensing cash.");
    }
    finishDispense(atm) {
        console.log("Cash dispensed. Returning to Idle.");
        atm.setState(new IdleStateE());
    }
}
class ATM {
    constructor(balance, correctPin) {
        this.state = new IdleStateE();
        this.balance = balance;
        this.correctPin = correctPin;
    }
    setState(state) {
        this.state = state;
    }
    insertCard() {
        this.state.insertCard(this);
    }
    enterPin(pin) {
        this.state.enterPin(this, pin);
    }
    withdrawCash(amount) {
        this.state.withdrawCash(this, amount);
    }
    dispenseCash() {
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
