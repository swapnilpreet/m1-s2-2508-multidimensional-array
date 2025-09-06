"use strict";
class EmailNotification {
    constructor(to) {
        this.to = to;
    }
    send(message) {
        console.log(`Sending EMAIL${this.to ? ` to ${this.to}` : ""}: ${message}`);
    }
}
class SMSNotification {
    constructor(phone) {
        this.phone = phone;
    }
    send(message) {
        console.log(`Sending SMS${this.phone ? ` to ${this.phone}` : ""}: ${message}`);
    }
}
class PushNotification {
    constructor(deviceToken) {
        this.deviceToken = deviceToken;
    }
    send(message) {
        console.log(`Sending PUSH${this.deviceToken ? ` to ${this.deviceToken}` : ""}: ${message}`);
    }
}
class NotificationFactory {
    static createNotification(type, target) {
        switch (type) {
            case "Email":
                return new EmailNotification(target);
            case "SMS":
                return new SMSNotification(target);
            case "Push":
                return new PushNotification(target);
            default:
                throw new Error("Unsupported notification type");
        }
    }
}
const notifier = NotificationFactory.createNotification("Email", "swapnil@gmail.com");
notifier.send("Welcome!");
const smsNotifier = NotificationFactory.createNotification("SMS", "8329207372");
smsNotifier.send("Your OTP is 445522");
