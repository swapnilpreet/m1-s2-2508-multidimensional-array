function myfilter(arr, callback,str) {
  var ans = [],odd=[];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      ans.push(arr[i]);
    }else{
        odd.push(arr[i])
    }
  }
//   console.log(ans,odd)
  if(str==="Even"){
    return ans
  }else{
    return odd
  }
}

let arr = [1, 2, 4, 5, 6, 5, 8, 9];

function isEven(num) {
    if(num % 2 === 0){
        return true
    }else{
        return false
    }
}
var even = myfilter(arr, isEven,"Even");
var odd = myfilter([7,8,9,4,3,2,], isEven,"Odd");
console.log(even,odd)

var profiles = [
  { name: "Arjun", age: 25 },
  { name: "Swapnil", age: 17 },
  { name: "Ravi", age: 30 }
];

// Filter adults
var adults = myfilter(profiles, function (p) {
  return p.age >= 18;
});
console.log(adults);

// // Map names
// var names = myMap(profiles, function (p) {
//   return p.name;
// });
// console.log(names);

// // Reduce total age
// var totalAge = myReduce(profiles, function (sum, p) {
//   return sum + p.age;
// }, 0);
// console.log(totalAge);
