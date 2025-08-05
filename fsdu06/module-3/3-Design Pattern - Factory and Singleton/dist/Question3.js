"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotification = exports.SMSNotification = exports.EmailNotification = void 0;
class EmailNotification {
    send(message) {
        console.log(`Sending EMAIL: ${message}`);
    }
}
exports.EmailNotification = EmailNotification;
class SMSNotification {
    send(message) {
        console.log(`Sending SMS: ${message}`);
    }
}
exports.SMSNotification = SMSNotification;
class PushNotification {
    send(message) {
        console.log(`Sending PUSH: ${message}`);
    }
}
exports.PushNotification = PushNotification;
class NotificationFactory {
    static createNotification(type) {
        switch (type.toLowerCase()) {
            case "email":
                return new EmailNotification();
            case "sms":
                return new SMSNotification();
            case "push":
                return new PushNotification();
            default:
                throw new Error("Invalid notification type");
        }
    }
}
const notifier = NotificationFactory.createNotification("Email");
notifier.send("Welcome!");
const smsNotifier = NotificationFactory.createNotification("SMS");
smsNotifier.send("Your OTP is 123456");
