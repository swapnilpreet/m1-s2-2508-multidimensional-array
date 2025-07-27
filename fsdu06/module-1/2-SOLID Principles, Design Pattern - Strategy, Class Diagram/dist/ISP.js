"use strict";
class OldPrinter {
    print() {
        console.log("Printing document...");
    }
}
class SmartPrinter {
    print() {
        console.log("SmartPrinter: Printing document...");
    }
    scan() {
        console.log("SmartPrinter: Scanning document...");
    }
    fax() {
        console.log("SmartPrinter: Sending fax...");
    }
}
const oldPrinter = new OldPrinter();
oldPrinter.print();
const smartPrinter = new SmartPrinter();
smartPrinter.print();
smartPrinter.scan();
smartPrinter.fax();
