import { IObserver, ISubject } from "./types";

export class EmailObserver implements IObserver {
  uniqueId: string;

  constructor(uniqueId: string) {
    this.uniqueId = uniqueId;
  }
  update(subject: ISubject): void {
    console.log(`EmailObserver:  ${this.uniqueId}Received update notification from ${subject}`);
  }
}
