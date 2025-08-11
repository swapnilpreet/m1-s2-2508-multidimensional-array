"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionDecorator = void 0;
const CourseSubscription_1 = require("./CourseSubscription");
class SubscriptionDecorator extends CourseSubscription_1.Coursesubscription {
    constructor(subscription) {
        super();
        this.subscription = subscription;
    }
}
exports.SubscriptionDecorator = SubscriptionDecorator;
