"use strict";
class VendingMachine {
    constructor() {
        this.idleState = new IdleState(this);
        this.processingState = new ProcessingState(this);
        this.dispensingState = new DispensingState(this);
        this.currentState = this.idleState;
    }
    setState(state) {
        this.currentState = state;
    }
    insertCoin() {
        this.currentState.insertCoin();
    }
    makeSelection() {
        this.currentState.makeSelection();
    }
    dispense() {
        this.currentState.dispense();
    }
}
class IdleState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Coin inserted. Moving to Processing state.");
        this.machine.setState(this.machine.processingState);
    }
    makeSelection() {
        console.log("You must insert a coin first!");
    }
    dispense() {
        console.log("No item to dispense!");
    }
}
class ProcessingState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Coin already inserted!");
    }
    makeSelection() {
        console.log("Selection made. Moving to Dispensing state.");
        this.machine.setState(this.machine.dispensingState);
    }
    dispense() {
        console.log("Please make a selection first!");
    }
}
class DispensingState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Please wait, already dispensing!");
    }
    makeSelection() {
        console.log("Already dispensing item!");
    }
    dispense() {
        console.log("Item dispensed. Going back to Idle state.");
        this.machine.setState(this.machine.idleState);
    }
}
const machine = new VendingMachine();
machine.insertCoin();
machine.makeSelection();
machine.dispense();
