import { IObserver, ISubject } from "./types";


export class YoutubeNotificationProvider implements ISubject {
    private observerList: IObserver[] = [];

    subscribe(observer: IObserver): void {
        const isExisting = this.observerList.includes(observer);
        if (isExisting) {
            console.log(`Observer with uniqueId ${observer.uniqueId} is already subscribed.`);
            return;
        }
        this.observerList.push(observer);
    }

    unsubscribe(observer: IObserver): void {
        const index = this.observerList.indexOf(observer);
        if (index === -1) {
            console.log(`Observer with uniqueId ${observer.uniqueId} is not subscribed.`);
            return;
        }
        this.observerList.splice(index, 1);
        console.log(`Observer with uniqueId ${observer.uniqueId} has been unsubscribed.`);
    }

    notify(): void {
        for (const observer of this.observerList) {
            observer.update(this);
        }
    }
}