

console.log("start");
const timeoutId= setTimeout(()=>{
    console.log("inside");
   
},2000)
clearTimeout(timeoutId);
console.log(timeoutId);
console.log("end");

