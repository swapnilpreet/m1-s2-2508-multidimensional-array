


function myReduce(arr,callback,initialvalue){
    var accumulator, startIndex;
    if(initialvalue!==undefined){
        accumulator=initialvalue
        startIndex=0;
    }else{
        accumulator=arr[0];
        startIndex=1;
    }
    for(let i=startIndex;i<arr.length;i++){
        accumulator=callback(accumulator,arr[i],i,arr);
    }

    return accumulator;
}

function sumfn(acc,num){
    return acc+num;
}

let totalsum=myReduce([1,2,4,5,6,8,9],sumfn,0);
console.log(totalsum);


let arr=[1,2,4,5,6,8,9];

let sumnew=arr.reduce((acc,curr)=>{
    return acc+curr
},0)
console.log("sumnew",sumnew)

var profiles = [
  { name: "Arjun", age: 25 },
  { name: "Swapnil", age: 17 },
  { name: "Ravi", age: 30 }
];

// Filter adults
// var adults = myFilter(profiles, function (p) {
//   return p.age >= 18;
// });
// console.log(adults);

// // Map names
// var names = myMap(profiles, function (p) {
//   return p.name;
// });
// console.log(names);

// Reduce total age
var totalAge = myReduce(profiles, function (sum, p) {
  return sum + p.age;
}, 0);
console.log(totalAge);