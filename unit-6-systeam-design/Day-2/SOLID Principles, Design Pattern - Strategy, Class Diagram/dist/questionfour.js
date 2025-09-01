"use strict";
class OldPrinter {
    print() {
        console.log("Printing document...");
    }
}
class SmartPrinter {
    print() {
        console.log("Printing document...");
    }
    scan() {
        console.log("Scanning document...");
    }
    fax() {
        console.log("Sending fax...");
    }
}
const oldPrinter = new OldPrinter();
oldPrinter.print();
const smartPrinter = new SmartPrinter();
smartPrinter.print();
smartPrinter.scan();
smartPrinter.fax();
