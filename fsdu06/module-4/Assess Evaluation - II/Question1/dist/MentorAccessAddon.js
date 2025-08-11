"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentorAccessAddon = void 0;
const SubscriptionDecorator_1 = require("./SubscriptionDecorator");
class mentorAccessAddon extends SubscriptionDecorator_1.SubscriptionDecorator {
    getCost() {
        return this.subscription.getCost() + 500;
    }
    getFeatures() {
        return [...this.subscription.getFeatures(), 'Weekly 1-on-1 Mentor Sessions'];
    }
}
exports.mentorAccessAddon = mentorAccessAddon;
