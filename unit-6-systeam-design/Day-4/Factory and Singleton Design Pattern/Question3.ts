interface INotification {
  send(message: string): void;
}
class EmailNotification implements INotification {
  constructor(private to?: string) {}
  send(message: string): void {
    console.log(`Sending EMAIL${this.to ? ` to ${this.to}` : ""}: ${message}`);
  }
}
class SMSNotification implements INotification {
  constructor(private phone?: string) {}
  send(message: string): void {
    console.log(`Sending SMS${this.phone ? ` to ${this.phone}` : ""}: ${message}`);
  }
}
class PushNotification implements INotification {
  constructor(private deviceToken?: string) {}
  send(message: string): void {
    console.log(`Sending PUSH${this.deviceToken ? ` to ${this.deviceToken}` : ""}: ${message}`);
  }
}
class NotificationFactory {
  static createNotification(
    type: "Email" | "SMS" | "Push",
    target?: string
  ): INotification {
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
