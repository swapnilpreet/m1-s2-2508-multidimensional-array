"use strict";
// its violates SRP it not follow principle bad exmple
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    saveUser() {
        console.log(`server user :${this.name}`);
    }
    sendEmail(message) {
        console.log(`sending email to :${this.email}:${message}`);
    }
}
const user = new User("swapnil", "swapnil@gmil.com");
user.saveUser();
user.sendEmail("welcome to usr app!");
// ✅ What’s Wrong?
// User class has two responsibilities:
// Handle user data and saving.
// Send emails.
// If email sending logic changes (e.g., switch to SMTP), User class must be modified, violating SRP.
// Good Example 
class SRPUser {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    ;
    saveUser() {
        console.log(`saveing user:${this.name}`);
    }
}
class EmailService {
    sendEmail(email, message) {
        console.log(`sending email to ${email}:${message}`);
    }
}
const srpUser = new SRPUser("swapnil", "swapnil@gmail.com");
srpUser.saveUser();
const srpemail = new EmailService();
srpemail.sendEmail(srpUser.email, "welcome");
// Why is this Better?
// User → only handles user data and saving.
// EmailService → only handles email sending.
// If email logic changes (e.g., SMTP, API), only EmailService changes, not User.
// ✅ Benefits
// ✔ Easier to maintain
// ✔ Cleaner code
// ✔ Fewer bugs when changing logic
// ✔ Supports SOLID principles and design patterns
// ✅ Why Do We Use SRP?
// ✔ Maintainability: Easier to update one feature without breaking others.
// ✔ Testability: Small, focused classes are easier to test.
// ✔ Scalability: Adding new features (e.g., new email provider) is easy.
// ✔ Reusability: Components can be reused in other projects.
// ✔ Loose Coupling: Reduces dependency between unrelated functionalities.
// ✅ Example in Simple Terms
// Imagine a Restaurant Manager:
// ❌ If one person does everything (cooking, billing, serving), any change affects the entire job.
// ✅ If roles are separate (Chef cooks, Cashier bills, Waiter serves), each role changes independently.
