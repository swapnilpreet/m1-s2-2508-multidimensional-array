import { SubscriptionDecorator } from "./SubscriptionDecorator";



export class mentorAccessAddon extends SubscriptionDecorator{
    getCost(): number {
        return this.subscription.getCost()+500;
    }

    getFeatures(): string[] {
        return [...this.subscription.getFeatures(),'Weekly 1-on-1 Mentor Sessions']
    }
}