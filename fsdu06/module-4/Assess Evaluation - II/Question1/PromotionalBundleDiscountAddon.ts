import { DoubtSupportAddon } from "./DoubtSupportAddon";
import { mentorAccessAddon } from "./MentorAccessAddon";
import { SubscriptionDecorator } from "./SubscriptionDecorator";



export class PromotionalBundleDiscountAddon extends SubscriptionDecorator{

    getCost(): number {
        let basecoast=this.subscription.getCost();
        let hasDoubtsSupport=this.hasDecorator(DoubtSupportAddon)
        let hasMentorAccess=this.hasDecorator(mentorAccessAddon);
        
        if(hasDoubtsSupport && hasMentorAccess){
            let dicount=15/100*basecoast;
            basecoast=basecoast-dicount;
        }
        return basecoast;
    }
    
    getFeatures(): string[] {
        return this.subscription.getFeatures();
    }

    private hasDecorator(decoratortype:Function):boolean{
        let current=this.subscription;
        while(current instanceof SubscriptionDecorator){
            if(current instanceof (decoratortype as any)){
                return true;
            }
            current=current["subscription"];
        }
        return false;
    }
}