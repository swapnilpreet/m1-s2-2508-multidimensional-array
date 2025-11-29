// JavaScript Practical Interview Questions — Full Detailed Version (Option A)
// Q1. Reverse a String

// Problem: Reverse "I'm Swapnil Ramteke".

// Brute-force Approach
function reverseBrute(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(reverseBrute("I'm Swapnil Ramteke"));


// Explanation:

// Loop starts from the last character and builds a new string.

// Each concatenation result += str[i] creates a new string (O(n) internally).

// Time Complexity (TC): O(n²)
// Space Complexity (SC): O(n) (new string of length n)

// Optimized Approach
function reverseOptimized(str) {
  return str.split("").reverse().join("");
}

console.log(reverseOptimized("I'm Swapnil Ramteke"));


// Explanation:

// split("") → O(n) time, O(n) space

// reverse() → O(n) time, in-place array reverse O(n) space for array

// join("") → O(n) time, creates final string

// Overall TC: O(n)
// Overall SC: O(n)

// Follow-up: Reverse words but not characters: "I love JS" → "JS love I"

// const reverseWords = str => str.split(" ").reverse().join(" ");


// TC/SC: O(n)

// Q2. Check Palindrome

// Problem: Check if string is palindrome.

// Brute-force
function isPalindromeBrute(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return str === reversed;
}

console.log(isPalindromeBrute("madam"));


// Explanation:

// Reverse string manually, then compare.

// TC: O(n²) due to string concatenation
// SC: O(n)

// Optimized Approach
function isPalindromeOptimized(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindromeOptimized("madam"));


// Explanation:

// Two pointers approach, no extra string needed.

// TC: O(n)
// SC: O(1)

// Follow-up: Ignore case and spaces

const checkPalindrome = str => {
  str = str.replace(/\s+/g, "").toLowerCase();
  return isPalindromeOptimized(str);
}

// Q3. Reverse an Array

// Problem: Reverse [1,2,3,4].

// Brute-force
function reverseArrayBrute(arr) {
  let res = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    res.push(arr[i]);
  }
  return res;
}


// TC: O(n) (loop)
// SC: O(n) (new array)

// Optimized Approach
function reverseArrayOptimized(arr) {
  let left = 0, right = arr.length - 1;
  while(left < right){
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++; right--;
  }
  return arr;
}


// Explanation:

// Swaps elements in-place, no new array created

// TC: O(n)
// SC: O(1)

// Follow-up: Using built-in arr.reverse()

// TC: O(n)

// SC: O(1) (in-place)

// Q4. Compare Two Arrays

// Problem: [1,2,3] vs [1,2,3]

// Brute-force
function compareBrute(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


// TC: O(n)
// SC: O(1)

// Optimized Approach
function compareOptimized(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}


// TC: O(n) (stringify iterates array)
// SC: O(n) (new string created)

// Follow-up: Nested array compare → need recursive comparison

// Q5. Null vs Undefined
console.log(null == undefined);  // true
console.log(null === undefined); // false


// Explanation:

// == does type coercion → null and undefined considered equal

// === strict → different types → false

// TC/SC: O(1)

// Q6. Remove Duplicate Elements
// Brute-force
function removeDuplicatesBrute(arr){
  let res = [];
  for(let i=0;i<arr.length;i++){
    if(!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
}


// TC: O(n²) (includes() inside loop)
// SC: O(n)

// Optimized Approach
const arr = [1,2,2,3,3,4];
const unique = [...new Set(arr)];


// Explanation:

// Set stores unique values

// ... spread converts set back to array

// TC: O(n)
// SC: O(n)

// Q7. Find Max & Min in Array
// Brute-force
function maxMinBrute(arr){
  let max = arr[0], min = arr[0];
  for(let i=1;i<arr.length;i++){
    if(arr[i] > max) max = arr[i];
    if(arr[i] < min) min = arr[i];
  }
  return {max,min};
}


// TC: O(n)
// SC: O(1)

// Optimized Approach
const arr = [10,50,2,99];
const max = Math.max(...arr);
const min = Math.min(...arr);


// Explanation:

// Spread operator feeds numbers to Math.max/min

// TC: O(n)
// SC: O(n) (spread creates temporary list)

// Follow-up: Find max without Math.max → Brute-force already best O(n)

// Q8. Count Characters in String
// Brute-force
function countCharsBrute(str){
  const map = {};
  for(let char of str){
    if(map[char]) map[char]++;
    else map[char]=1;
  }
  return map;
}


// TC: O(n)
// SC: O(n)

// Optimized Approach

// Already optimized — single pass

// Follow-up: Ignore case

// str = str.toLowerCase();

// Q9. Swap Two Variables Without Temp
// Brute-force
let a = 10, b = 20;
let temp = a;
a = b;
b = temp;


// TC/SC: O(1)

// Optimized Approach
let [a,b] = [b,a];


// TC/SC: O(1)

// Follow-up: Swap without array → a = a + b; b = a - b; a = a - b;

// Q10. FizzBuzz Program
// Brute-force / Normal
for(let i=1;i<=20;i++){
  if(i%3===0 && i%5===0) console.log("FizzBuzz");
  else if(i%3===0) console.log("Fizz");
  else if(i%5===0) console.log("Buzz");
  else console.log(i);
}


// TC: O(n)
// SC: O(1)
 

// ✅ Q11 — Find the Sum of All Elements in an Array
// Brute Force Approach
function sumBrute(arr) {
  let sum = 0;
  arr.forEach(num => sum += num);
  return sum;
}

// Explanation

// forEach() loops through all elements → O(n)

// Simple addition

// TC: O(n)
// SC: O(1)
// Optimized Approach (Using Reduce)
function sumOptimized(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

// Explanation of reduce()

// Goes through array exactly once → O(n)

// Accumulates values in constant space

// TC: O(n)
// SC: O(1)
// Follow-Up

// Q: How to find the average?

function findAverage(arr) {
  return arr.reduce((a, c) => a + c, 0) / arr.length;
}


// TC: O(n)
// SC: O(1)

// ✅ Q12 — Count Occurrences of Each Element
// Brute Force
function countBrute(arr) {
  let visited = [];
  arr.forEach(item => {
    let count = 0;
    arr.forEach(check => {
      if (item === check) count++;
    });
    if (!visited.includes(item)) {
      console.log(item, count);
      visited.push(item);
    }
  });
}

// TC: O(n²)

// Two nested loops.

// SC: O(n)
// Optimized Approach (Using Map)
function countOptimized(arr) {
  const map = new Map();
  for (let num of arr) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  return map;
}

// TC: O(n)
// SC: O(n)
// Follow-up

// Q: How to find the most frequent element?

function mostFrequent(arr) {
  const map = {};
  let maxCount = 0, ans;

  for (let n of arr) {
    map[n] = (map[n] || 0) + 1;
    if (map[n] > maxCount) {
      maxCount = map[n];
      ans = n;
    }
  }
  return ans;
}

// ✅ Q13 — Find Prime Numbers in a Range
// Brute Force
function isPrimeBrute(n) {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// TC: O(n) per number
// SC: O(1)
// Optimized Approach
function isPrimeOptimized(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// TC: O(√n)
// SC: O(1)
// Follow-up

// Q: Print all primes between 1 to 100?

function allPrimes(n) {
  const result = [];
  for (let i = 2; i <= n; i++) {
    if (isPrimeOptimized(i)) result.push(i);
  }
  return result;
}

// ✅ Q14 — Find the Missing Number in Array (1 to n)

// Example: [1,2,4,5] missing 3.

// Brute Force
function missingBrute(arr, n) {
  for (let i = 1; i <= n; i++) {
    if (!arr.includes(i)) return i;
  }
}

// Explanation of includes()

// Performs linear search → O(n)

// TC: O(n²)

// Because includes() → O(n) inside loop → O(n × n)

// SC: O(1)
// Optimized Approach (Sum Formula)
function missingOptimized(arr, n) {
  const expected = (n * (n + 1)) / 2;
  const actual = arr.reduce((a, c) => a + c, 0);
  return expected - actual;
}

// TC: O(n)
// SC: O(1)
// Follow-Up

// Q: What if multiple numbers are missing?

function findAllMissing(arr, n) {
  const set = new Set(arr);
  const missing = [];

  for (let i = 1; i <= n; i++) {
    if (!set.has(i)) missing.push(i);
  }
  return missing;
}

// ✅ Q15 — Remove Duplicates from Array
// Brute Force
function removeDupBrute(arr) {
  let result = [];
  arr.forEach(item => {
    if (!result.includes(item)) result.push(item);
  });
  return result;
}

// TC: O(n²)

// includes() = O(n)

// SC: O(n)
// Optimized Approach (Using Set)
function removeDupOptimized(arr) {
  return [...new Set(arr)];
}

// TC: O(n)
// SC: O(n)
// Follow-up

// Q: How to keep only elements that appear once?

function uniqueOnly(arr) {
  const map = {};
  arr.forEach(n => map[n] = (map[n] || 0) + 1);
  return arr.filter(n => map[n] === 1);
}

// ✅ Q16 — Find the Second Largest Number
// Brute Force
function secondLargestBrute(arr) {
  const sorted = arr.sort((a, b) => b - a);
  return sorted[1];
}

// TC of sort(): O(n log n)
// SC: O(n)
// Optimized Approach
function secondLargestOptimized(arr) {
  let max = -Infinity;
  let second = -Infinity;

  for (let n of arr) {
    if (n > max) {
      second = max;
      max = n;
    } else if (n > second && n !== max) {
      second = n;
    }
  }
  return second;
}

// TC: O(n)
// SC: O(1)
// Follow-up

// Q: What if duplicates exist?
// Solution covers that using n !== max.

// ✅ Q17 — Check if String Contains Only Digits
// Brute Force
function onlyDigitsBrute(str) {
  for (let ch of str) {
    if (ch < '0' || ch > '9') return false;
  }
  return true;
}

// TC: O(n)
// SC: O(1)
// Optimized Approach (Regex)
// function onlyDigitsOptimized(str) {
//   return /^[0-9]+$/.test(str);
// }

// TC: O(n)
// SC: O(1)
// Follow-up

// Q: Allow decimals?

// /^\d+(\.\d+)?$/

// ✅ Q18 — Count Vowels in a String
// Brute Force
function vowelsBrute(str) {
  let count = 0;
  for (let ch of str.toLowerCase()) {
    if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
      count++;
    }
  }
  return count;
}

// TC: O(n)
// SC: O(1)
// Optimized Approach (Set)
function vowelsOptimized(str) {
  const vowels = new Set(['a','e','i','o','u']);
  let count = 0;

  for (let ch of str.toLowerCase()) {
    if (vowels.has(ch)) count++;
  }
  return count;
}

// TC: O(n)
// SC: O(1)
// Follow-up

// Q: How to return vowels also?

function vowelsList(str) {
  const v = new Set(['a','e','i','o','u']);
  return str.toLowerCase().split("").filter(ch => v.has(ch));
}

// ✅ Q19 — Rotate Array by k Steps

// Example: [1,2,3,4,5] rotate right by 2 → [4,5,1,2,3]

// Brute Force
function rotateBrute(arr, k) {
  for (let i = 0; i < k; i++) {
    let last = arr.pop();
    arr.unshift(last);
  }
  return arr;
}

// TC: O(k × n)

// unshift() is O(n)

// SC: O(1)
// Optimized Approach
function rotateOptimized(arr, k) {
  k = k % arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}

// Method TC:

// slice() → O(n)

// spread → O(n)

// Total TC: O(n)
// SC: O(n)
// Follow-up

// Q: Rotate left?

function rotateLeft(arr, k) {
  k = k % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

// ✅ Q20 — Merge Two Sorted Arrays
// Brute Force
function mergeBrute(a, b) {
  const merged = [...a, ...b];
  return merged.sort((x, y) => x - y);
}

// TC: sort → O((n+m) log(n+m))
// SC: O(n+m)

// Optimized Approach (Two Pointers)
function mergeOptimized(a, b) {
  let i = 0, j = 0;
  let result = [];

  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }

  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);

  return result;
}

// TC: O(n + m)
// SC: O(n + m)
// Follow-up

// Q: How to merge in-place?

// Only possible in languages like C/C++; not possible cleanly in JS.