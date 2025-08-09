
interface VendingMachineState {
    insertCoin(): void;
    selectProduct(): void;
    dispenseProduct(): void;
}

class VendingMachine {
    private idle: VendingMachineState;
    private processing: VendingMachineState;
    private dispensing: VendingMachineState;
    private current: VendingMachineState;

    constructor() {
        this.idle = new IdleState(this);
        this.processing = new ProcessingState(this);
        this.dispensing = new DispensingState(this);
        this.current = this.idle;
    }

    setState(newState: VendingMachineState) {
        this.current = newState;
    }
    getIdleState(): VendingMachineState {
        return this.idle;
    }
    getProcessingState(): VendingMachineState {
        return this.processing;
    }
    getDispensingState(): VendingMachineState {
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

class IdleState implements VendingMachineState {
    constructor(private machine: VendingMachine) {}

    insertCoin(): void {
        console.log("Coin inserted. Switching to Processing State...");
        this.machine.setState(this.machine.getProcessingState());
    }
    selectProduct(): void {
        console.log("Please insert a coin first.");
    }
    dispenseProduct(): void {
        console.log("Insert coin and select a product first.");
    }
}

class ProcessingState implements VendingMachineState {
    constructor(private machine: VendingMachine) {}

    insertCoin(): void {
        console.log("Coin already inserted. Please select a product.");
    }
    selectProduct(): void {
        console.log("Product selected. Switching to Dispensing State...");
        this.machine.setState(this.machine.getDispensingState());
    }
    dispenseProduct(): void {
        console.log("Please select a product before dispensing.");
    }
}


class DispensingState implements VendingMachineState {
    constructor(private machine: VendingMachine) {}

    insertCoin(): void {
        console.log("Wait! Dispensing in progress...");
    }
    selectProduct(): void {
        console.log("Wait! Dispensing in progress...");
    }
    dispenseProduct(): void {
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
