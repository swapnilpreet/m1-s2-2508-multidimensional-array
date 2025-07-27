// object orientaed progrramming

class Person{
    name:string;
    interest:string;

    constructor(name:string,interest:string){
        this.name=name;
        this.interest=interest
    }
    introduce():void{
        console.log(`hellow ${this.name},intreseted in ${this.interest}`)
    }

}

let person1:Person=new  Person("swapnil","system Design")
person1.introduce();