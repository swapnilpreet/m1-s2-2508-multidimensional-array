import { IObserver, ISubject } from "./types";



export class MobileObserver implements IObserver {
    uniqueId: string;
     update(subject:ISubject): void {
         console.log(`MobileObserver: Received update notification. ${subject}`);
     }
}