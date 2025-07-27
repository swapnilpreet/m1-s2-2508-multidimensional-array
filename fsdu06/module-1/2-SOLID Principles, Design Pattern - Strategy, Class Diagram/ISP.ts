interface Printable {
    print(): void;
}

interface Scannable {
    scan(): void;
}

interface Faxable {
    fax(): void;
}

class OldPrinter implements Printable {
    public print(): void {
        console.log("Printing document...");
    }
}

class SmartPrinter implements Printable, Scannable, Faxable {
    public print(): void {
        console.log("SmartPrinter: Printing document...");
    }

    public scan(): void {
        console.log("SmartPrinter: Scanning document...");
    }

    public fax(): void {
        console.log("SmartPrinter: Sending fax...");
    }
}

const oldPrinter: Printable = new OldPrinter();
oldPrinter.print();

const smartPrinter: SmartPrinter = new SmartPrinter();
smartPrinter.print();
smartPrinter.scan();
smartPrinter.fax();