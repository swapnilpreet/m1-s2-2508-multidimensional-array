"use strict";
class VendingMachine {
    constructor() {
        this.idle = new IdleState(this);
        this.processing = new ProcessingState(this);
        this.dispensing = new DispensingState(this);
        this.current = this.idle;
    }
    setState(newState) {
        this.current = newState;
    }
    getIdleState() {
        return this.idle;
    }
    getProcessingState() {
        return this.processing;
    }
    getDispensingState() {
        return this.dispensing;
    }
    insertCoin() {
        this.current.insertCoin();
    }
    selectProduct() {
        this.current.selectProduct();
    }
    dispenseProduct() {
        this.current.dispenseProduct();
    }
}
class IdleState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Coin inserted. Switching to Processing State...");
        this.machine.setState(this.machine.getProcessingState());
    }
    selectProduct() {
        console.log("Please insert a coin first.");
    }
    dispenseProduct() {
        console.log("Insert coin and select a product first.");
    }
}
class ProcessingState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Coin already inserted. Please select a product.");
    }
    selectProduct() {
        console.log("Product selected. Switching to Dispensing State...");
        this.machine.setState(this.machine.getDispensingState());
    }
    dispenseProduct() {
        console.log("Please select a product before dispensing.");
    }
}
class DispensingState {
    constructor(machine) {
        this.machine = machine;
    }
    insertCoin() {
        console.log("Wait! Dispensing in progress...");
    }
    selectProduct() {
        console.log("Wait! Dispensing in progress...");
    }
    dispenseProduct() {
        console.log("Product dispensed. Returning to Idle State...");
        this.machine.setState(this.machine.getIdleState());
    }
}
const vendingMachine = new VendingMachine();
vendingMachine.insertCoin();
vendingMachine.selectProduct();
vendingMachine.dispenseProduct();
console.log("----");
vendingMachine.selectProduct();
vendingMachine.insertCoin();
vendingMachine.dispenseProduct();
