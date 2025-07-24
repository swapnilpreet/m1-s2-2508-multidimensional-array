"use strict";
// object orientaed progrramming
class Person {
    constructor(name, interest) {
        this.name = name;
        this.interest = interest;
    }
    introduce() {
        console.log(`hellow ${this.name},intreseted in ${this.interest}`);
    }
}
let person1 = new Person("swapnil", "system Design");
person1.introduce();
