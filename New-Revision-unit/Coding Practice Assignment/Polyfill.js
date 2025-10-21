Array.prototype.Isincludes = function (searchElement, fromIndex = 0) {
  if (this == null)
    throw new TypeError("Array.prototype.includes called on null or undefined");
  const arr = this;
  const len = arr.length >>> 0;
  if (len === 0) return false;
  let start = fromIndex >= 0 ? fromIndex : Math.max(len + fromIndex, 0);

  for (let i = start; i < len; i++) {
    if (
      arr[i] === searchElement ||
      (Number.isNaN(arr[i]) && Number.isNaN(searchElement))
    ) {
      return true;
    }
  }
  return false;
};

console.log([1, 2, 3].Isincludes(2));
console.log([1, 2, 3].Isincludes(4));
console.log([NaN, 5, 7].Isincludes(NaN));

Array.prototype.myMap = function (callback, thisArg) {
  if (this == null)
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  const arr = this;
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }
  return result;
};

console.log([1, 2, 3].myMap((x) => x * 2));
console.log(["a", "b"].myMap((v, i) => v + i));


Array.prototype.myForEach = function (callback, thisArg) {
  if (this == null) throw new TypeError("Array.prototype.myForEach called on null or undefined");
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");

  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      callback.call(thisArg, arr[i], i, arr);
    }
  }
};
[10, 20, 30].myForEach((num, i) => console.log(`Index ${i}: ${num}`));


Array.prototype.mySort = function (compareFn) {
  if (this == null) throw new TypeError("Array.prototype.mySort called on null or undefined");
  const arr = [...this];
  const len = arr.length;
  const cmp = compareFn || ((a, b) => {
    const A = String(a);
    const B = String(b);
    return A > B ? 1 : (A < B ? -1 : 0);
  });
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (cmp(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

console.log([3, 1, 2].mySort()); 
console.log(["b", "a", "c"].mySort());
console.log([10, 5, 20].mySort((a, b) => a - b));
