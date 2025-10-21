function myMap(array, callback, thisArg) {
  const result = [];

  // 1
  // Implement the logic here
  for (let i=0;i<array.length;i++){
    if (i in array) {
      result[i]=callback.call(thisArg,array[i],i,array);
    } else {
      result[i] = undefined;
    }
  }

  return result;
}

// Example usage
const numbers = [1, , 3, 4]; // sparse array
const context = { factor: 2 };

const multiplied = myMap(numbers, function(num) {
  return num * this.factor;
}, context);

console.log(multiplied); // [ 2, undefined, 6, 8]
