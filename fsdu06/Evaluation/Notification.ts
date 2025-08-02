interface Subscriber{
    update(postTitle:string):void;
}

class Blog{
    private subscribers: Subscriber[] = [];
    subscribe(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }
    unsubscribe(subscriber:Subscriber): void {
        this.subscribers=this.subscribers.filter((sub)=>sub !==subscriber);
    }
    publish(postTitle:string):void{
        for(let subscriber of this.subscribers){
            subscriber.update(postTitle);
        }
    }
}

class Emailsubscriber implements Subscriber{
    update(postTitle: string): void {
        console.log(`Email: New blog post titled ${postTitle}`);
    }
}

class SMSSubscriber implements Subscriber{
    update(postTitle: string): void {
        console.log(`SMS: New blog post titled ${postTitle}`);
    }
}

const blog = new Blog();
const newEmailSubscriber=new Emailsubscriber();
const newSMSSubscriber=new SMSSubscriber();

blog.subscribe(newEmailSubscriber);
blog.subscribe(newSMSSubscriber);
blog.publish("Design Patterns in JavaScript")
blog.publish("Observer Pattern Simplified")