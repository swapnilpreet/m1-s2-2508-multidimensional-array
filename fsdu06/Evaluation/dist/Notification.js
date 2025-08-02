"use strict";
class Blog {
    constructor() {
        this.subscribers = [];
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    }
    publish(postTitle) {
        for (let subscriber of this.subscribers) {
            subscriber.update(postTitle);
        }
    }
}
class Emailsubscriber {
    update(postTitle) {
        console.log(`Email: New blog post titled ${postTitle}`);
    }
}
class SMSSubscriber {
    update(postTitle) {
        console.log(`SMS: New blog post titled ${postTitle}`);
    }
}
const blog = new Blog();
const newEmailSubscriber = new Emailsubscriber();
const newSMSSubscriber = new SMSSubscriber();
blog.subscribe(newEmailSubscriber);
blog.subscribe(newSMSSubscriber);
blog.publish("Design Patterns in JavaScript");
blog.publish("Observer Pattern Simplified");
