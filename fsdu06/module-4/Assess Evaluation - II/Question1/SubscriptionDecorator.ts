import { Coursesubscription } from "./CourseSubscription"


export abstract class SubscriptionDecorator extends Coursesubscription{
    protected subscription:Coursesubscription;

    constructor(subscription:Coursesubscription){
        super();
        this.subscription=subscription;
    }

    abstract getCost(): number;
    abstract getFeatures(): string[];
}