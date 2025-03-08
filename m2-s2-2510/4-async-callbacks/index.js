// Q: 11
// Title:
// L0 - Understanding Synchronous Code Execution

 
for(let i=0;i<1000000;i++){
    if(i==999999){
        console.log("Task 1")
    }
}

for(let i=0;i<10000000;i++){
    if(i==9999999){
        console.log("Task 2")
    }
}
for(let i=0;i<1000000000;i++){
    if(i==999999999){
        console.log("Task 3")
    }
}

 
// Q: 12
// Title:
// L0 - Implementing setTimeout for Delayed Messages

function quetimeout(params) {
  console.log("Message 1");
  setTimeout(() => {
    console.log("Message 2");
  }, 2000);
  console.log("Message 3");
}

quetimeout();


// Q: 13
// Title:
// L1 - Simulating a Loading Screen with setInterval

let interval = () => {
  let count = 0;
  let current = setInterval(() => {
    count++;
    console.log("Loading");
    if (count >= 5) {
      clearInterval(current);
      console.log("ending");
    }
  }, 1000);
};

interval();


// Q: 14
// Title:
// L1 - Debugging Event Loop Order

console.log("Begin");
setTimeout(() => {
  console.log("Timeout Task");
}, 2000)
Promise.resolve().then(() => {
  console.log("Promise Task");
});
console.log("End");
