interface State {
  insertCoin(): void;
  makeSelection(): void;
  dispense(): void;
}
class VendingMachine {
  idleState: State;
  processingState: State;
  dispensingState: State;
  currentState: State;
  constructor() {
    this.idleState = new IdleState(this);
    this.processingState = new ProcessingState(this);
    this.dispensingState = new DispensingState(this);
    this.currentState = this.idleState;
  }
  setState(state: State) {
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
class IdleState implements State {
  private machine: VendingMachine;
  constructor(machine: VendingMachine) {
    this.machine = machine;
  }
  insertCoin(): void {
    console.log("Coin inserted. Moving to Processing state.");
    this.machine.setState(this.machine.processingState);
  }
  makeSelection(): void {
    console.log("You must insert a coin first!");
  }
  dispense(): void {
    console.log("No item to dispense!");
  }
}
class ProcessingState implements State {
  private machine: VendingMachine;
  constructor(machine: VendingMachine) {
    this.machine = machine;
  }
  insertCoin(): void {
    console.log("Coin already inserted!");
  }
  makeSelection(): void {
    console.log("Selection made. Moving to Dispensing state.");
    this.machine.setState(this.machine.dispensingState);
  }
  dispense(): void {
    console.log("Please make a selection first!");
  }
}
class DispensingState implements State {
  private machine: VendingMachine;
  constructor(machine: VendingMachine) {
    this.machine = machine;
  }
  insertCoin(): void {
    console.log("Please wait, already dispensing!");
  }
  makeSelection(): void {
    console.log("Already dispensing item!");
  }
  dispense(): void {
    console.log("Item dispensed. Going back to Idle state.");
    this.machine.setState(this.machine.idleState);
  }
}
const machine = new VendingMachine();

machine.insertCoin();
machine.makeSelection();
machine.dispense();
