"use strict";
// bad exmple one big interface unnecessary method
class SimplePrinter {
    print() {
        console.log("printing....");
    }
    scan() {
        console.log("scaning....");
    }
    fax() {
        console.log('Fax...');
    }
}
class ISimplePrinter {
    print() {
        console.log("New Doc printing.....");
    }
}
class MultiFunctionMachine {
    print() {
        console.log("printing.....");
    }
    scan() {
        console.log("sacing....");
    }
    fax() {
        console.log("faxing...");
    }
}
const NewDocone = new ISimplePrinter();
// console.log()
NewDocone.print();
const NewMulti = new MultiFunctionMachine();
NewMulti.print();
NewMulti.fax();
NewMulti.fax();
// Why Good?
// SimplePrinter implements only IPrinter.
// MultiFunctionPrinter implements all as it supports them.
// Each class depends only on what it needs.
// ✅ Breaking Down Each Word
// Interface → Contract that defines a set of methods.
// Segregation → Splitting into smaller parts.
// Principle → Fundamental rule for good design.
// No client should depend on methods it does not use → Classes should only be tied to methods they actually need.
// ✅ Definition
// Interface Segregation Principle states:
// "No client should be forced to depend on methods it does not use."
// In simple words, instead of having a large, fat interface, split it into smaller, specific interfaces so that implementing classes only need to implement what they actually use.
// ✅ Detailed Explanation
// Interface → A contract that defines methods a class must implement.
// Segregation → Splitting into smaller, focused pieces.
// ISP means don’t create a single interface that forces classes to implement unnecessary methods.
// Example: If you have an IMachine interface with print(), scan(), fax(), a class that only prints should not be forced to implement scan() and fax().
// ✅ Use Case
// Large applications where different clients need different capabilities.
// Example: Printer system
// Some printers print only.
// Some print + scan.
// Some print + scan + fax.
// Instead of one giant interface, create separate small interfaces.
// ✅ Benefits
// ✔ High cohesion → Each interface has focused responsibility.
// ✔ Better maintainability → Easier to modify small interfaces.
// ✔ Increases flexibility → Classes implement only what they need.
// ✔ Follows SRP (Single Responsibility Principle).
// ❌ Disadvantages
// ✖ Too many interfaces → Can make the design complex.
// ✖ Difficult for beginners → Hard to understand when to split.
// ✖ Over-engineering risk → Splitting unnecessarily for small projects.
