"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubtSupportAddon = void 0;
const SubscriptionDecorator_1 = require("./SubscriptionDecorator");
class DoubtSupportAddon extends SubscriptionDecorator_1.SubscriptionDecorator {
    getCost() {
        return this.subscription.getCost() + 300;
    }
    getFeatures() {
        return [...this.subscription.getFeatures(), '24/7 Doubt Support via Chat'];
    }
}
exports.DoubtSupportAddon = DoubtSupportAddon;
