"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateAddon = void 0;
const SubscriptionDecorator_1 = require("./SubscriptionDecorator");
class CertificateAddon extends SubscriptionDecorator_1.SubscriptionDecorator {
    getCost() {
        return this.subscription.getCost() + 200;
    }
    getFeatures() {
        return [...this.subscription.getFeatures(), 'Official Certificate of Completion'];
    }
}
exports.CertificateAddon = CertificateAddon;
