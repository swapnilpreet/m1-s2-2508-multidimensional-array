JavaScript Output & Explanation Assignment
You are given multiple small JavaScript snippets.
Your task is to predict the output of each snippet and write the explanation for why that output occurs.
Document all answers in this README.md file.

Q1
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);

answer will be 
    1
    4 
    3
    2

    1 => bcs console.log it is a synchronous code that why it will run first 
    4 => some as above
    3 => this is async code and asycn code move to microtask but this console inside promise and we know that promise goes is microtask and this will run before the macrotask that the resone it will print first aflter completed all task from microtassk then macrotask start ther exucation.

    2 => bcs this piece of code goes in macrotask it will run after microtak done there work 


Q2
console.log(a);
var a = 10;
console.log(b);
let b = 20;


answer will be 
    undefiend 
    error referenceError

    a is initialized with var and var is hoisted that the resone we get undefiend

    b is initialized with let that the resone it will move tdz bcs of this we cant access variable before initialization thats the reasone its will give references error;



Q3
function foo() {
  console.log(this);
}
foo();
const obj = { foo };
obj.foo();

Output:
    Object [global]
    { foo: [Function: foo] }

    when foo fn called this find obj in fn not found obj then it will go beyound the fn and will it found golbal obj window that the resone it will return object golbal for window

    when  obj.foo() called this refres to the calling obj(obj);


Q4
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}

output will be 
    3
    3
    3
    0
    1
    2

    for loop contain var i and var is fn scoped when settimeout run after 1 second the for loop done there excutaion and set timeout find i value as 3 bcs of this it will retun 3 types 3

    second for loop using let it will balck scope tht means new copy of j creted each time loop iteration
    when settimeout runs it remembers the correct value of j for that iteration 


Q5
const obj = { a: 1 };
Object.freeze(obj);
obj.a = 100;
console.log(obj.a);

answer will be
    1

    freezes will be freezes the object
        basiclly it stop opetion on obj like cont chnages properties,we cant add properties, we can not delete properties,when we do obj.a=100; so it will not work that the resone we got 1 as answer


Q6
const obj1 = { name: "Alice" };
const obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name);

answer will be the:
    Bob
    obj1 and obj2 both have pont to some memory location that way whatever chnages we will do in obj2 that also replicate in obj1

Q7
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = { ...obj };
shallowCopy.b.c = 42;
console.log(obj.b.c);

answer will be the
    42

    the spread operator make a shallow copy top level properties will copy and nested obj shared refereances shallowCopy.b.c = 42; it will modifed nested obj 

Q8
function foo(x, y, z) {
  console.log(x, y, z);
}
foo(...[1, 2]);
foo(...[1, 2, 3, 4]);

answer will be
    1 2 undefined
    1 2 3

    first call we only passed two arguments and second fn called we passed arr argumets but fn need only the so 4 will not consider 

Q9
function foo(a, b, c) {
  arguments[0] = 99;
  console.log(a, arguments[1]);
}
foo(1, 2, 3);

answer will be 
    99 2
    
    using argumets obj linked with fn parameters we can access fn parameter using arguments key word so in above case we modififed 0th paramters that the resone we get 99 and 2
    
Q10
console.log(typeof null);
console.log(null instanceof Object);
console.log([] instanceof Array);
console.log([] instanceof Object);

answer wil be
    object
    false
    true
    true

    type of null is obj
    null is obj but it dont have instences bcs it a primitive data types,
    array is instance of Array
    array inherites from object
    
