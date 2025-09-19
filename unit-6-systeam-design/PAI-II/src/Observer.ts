

export interface Observer{
    update(orderid:string, newState:string):void;
}


export interface Subject{
    registerObserver(obs:Observer):void;
    removeObserver(obs:Observer):void;
    notifyObservers():void;
}

export class CustomerDisplay implements Observer{
    private name:string;
    constructor(name:string){
        this.name=name;
    }
    update(orderid: string, newState: string): void {
        if(newState==="Ready"){
            console.log(`Display: ${this.name} OrderId ${orderid} is ready`)
        }else{
            console.log(`Display ${this.name} OrderId : ${orderid} changedState ${newState}`)
        }
    }
}

