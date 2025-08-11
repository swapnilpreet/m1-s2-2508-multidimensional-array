import { SubscriptionDecorator } from "./SubscriptionDecorator";



export class CertificateAddon extends SubscriptionDecorator{

    getCost(): number {
        return this.subscription.getCost()+200
    }
    getFeatures(): string[] {
        return [...this.subscription.getFeatures(),'Official Certificate of Completion']
    }
}