"use strict";
class TaskManager {
    createTask(name) {
        console.log(`Creating task: ${name}`);
    }
}
class EmailService {
    sendEmail(to) {
        console.log(`Sending email to ${to}`);
    }
}
const newtask = new TaskManager();
newtask.createTask("complete SRP");
const newemail = new EmailService();
newemail.sendEmail("swapnil@gmail.com");
