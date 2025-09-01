"use strict";
class TaskService {
    createTask(name) {
        console.log(`Creating task: ${name}`);
    }
}
class EmailService {
    sendEmail(to) {
        console.log(`Sending email to ${to}`);
    }
}
const newtaskService = new TaskService();
newtaskService.createTask("Write documentation");
const newemailService = new EmailService();
newemailService.sendEmail("swapniilram.com");
