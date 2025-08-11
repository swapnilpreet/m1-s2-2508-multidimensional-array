import { Coursesubscription } from "./CourseSubscription";


export class BasicSubscription extends Coursesubscription{
    getCost(): number {
        return 499
    }
    getFeatures(): string[] {
        return ['Access to all basic courses']
    }
}
