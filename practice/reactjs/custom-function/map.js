function myMap(arr, callback) {
  var ans = [];
  for (let i = 0; i < arr.length; i++) {
    ans.push(callback(arr[i], i, arr));
  }
  return ans;
}

function double(num) {
  return num * 2;
}

function squrefn(num){
    return num*num;
}

let arr = [1, 2, 5, 4, 2];
var double = myMap(arr, double);
console.log(double)
var squre=myMap(arr,squrefn)
console.log(squre)


var profiles = [
  { name: "Arjun", age: 25 },
  { name: "Swapnil", age: 17 },
  { name: "Ravi", age: 30 }
];

// // Filter adults
// var adults = myFilter(profiles, function (p) {
//   return p.age >= 18;
// });
// console.log(adults);

// Map names
var names = myMap(profiles, function (p) {
  return p.name;
});
console.log(names);

// // Reduce total age
// var totalAge = myReduce(profiles, function (sum, p) {
//   return sum + p.age;
// }, 0);
// console.log(totalAge);
