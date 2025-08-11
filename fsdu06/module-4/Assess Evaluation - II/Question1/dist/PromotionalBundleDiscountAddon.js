"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalBundleDiscountAddon = void 0;
const DoubtSupportAddon_1 = require("./DoubtSupportAddon");
const MentorAccessAddon_1 = require("./MentorAccessAddon");
const SubscriptionDecorator_1 = require("./SubscriptionDecorator");
class PromotionalBundleDiscountAddon extends SubscriptionDecorator_1.SubscriptionDecorator {
    getCost() {
        let basecoast = this.subscription.getCost();
        let hasDoubtsSupport = this.hasDecorator(DoubtSupportAddon_1.DoubtSupportAddon);
        let hasMentorAccess = this.hasDecorator(MentorAccessAddon_1.mentorAccessAddon);
        if (hasDoubtsSupport && hasMentorAccess) {
            let dicount = 15 / 100 * basecoast;
            basecoast = basecoast - dicount;
        }
        return basecoast;
    }
    getFeatures() {
        return this.subscription.getFeatures();
    }
    hasDecorator(decoratortype) {
        let current = this.subscription;
        while (current instanceof SubscriptionDecorator_1.SubscriptionDecorator) {
            if (current instanceof decoratortype) {
                return true;
            }
            current = current["subscription"];
        }
        return false;
    }
}
exports.PromotionalBundleDiscountAddon = PromotionalBundleDiscountAddon;
