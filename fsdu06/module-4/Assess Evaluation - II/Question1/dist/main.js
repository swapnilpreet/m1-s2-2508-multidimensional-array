"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicSubscription_1 = require("./BasicSubscription");
const CertificateAddon_1 = require("./CertificateAddon");
const DoubtSupportAddon_1 = require("./DoubtSupportAddon");
const MentorAccessAddon_1 = require("./MentorAccessAddon");
const PromotionalBundleDiscountAddon_1 = require("./PromotionalBundleDiscountAddon");
function main() {
    let newsubscription1 = new CertificateAddon_1.CertificateAddon(new BasicSubscription_1.BasicSubscription());
    console.log(newsubscription1.getCost());
    console.log(newsubscription1.getFeatures());
    let newsubscription2 = new PromotionalBundleDiscountAddon_1.PromotionalBundleDiscountAddon(new CertificateAddon_1.CertificateAddon(new MentorAccessAddon_1.mentorAccessAddon(new DoubtSupportAddon_1.DoubtSupportAddon(new BasicSubscription_1.BasicSubscription()))));
    console.log(newsubscription2.getCost());
    console.log(newsubscription2.getFeatures());
}
main();
