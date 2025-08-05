interface Notification {
  send(message: string): void;
}
 
export class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`Sending EMAIL: ${message}`);
  }
}
 
export class SMSNotification implements Notification {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}
 
export class PushNotification implements Notification {
  send(message: string): void {
    console.log(`Sending PUSH: ${message}`);
  }
}


class NotificationFactory {
  static createNotification(type: string): Notification {
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