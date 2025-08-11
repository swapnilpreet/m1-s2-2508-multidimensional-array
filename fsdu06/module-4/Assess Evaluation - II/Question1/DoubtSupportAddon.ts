import { SubscriptionDecorator } from "./SubscriptionDecorator";



export class DoubtSupportAddon extends SubscriptionDecorator{
    getCost(): number {
        return this.subscription.getCost()+300;
    }

    getFeatures(): string[] {
        return [...this.subscription.getFeatures(),'24/7 Doubt Support via Chat']
    }
}