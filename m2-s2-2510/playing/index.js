
// Q: 11
// Title:
// L0 - Extract and Reverse a Portion of an Array


let arr =[15,30,45,60,75,90];

function extractAndReverse(arr) {
    let subarr=arr.slice(3,5);
    subarr.reverse();
    return subarr;
}
console.log("question 1");

console.log(extractAndReverse(arr))



// Q: 12
// Title:
// L1 - Implementing Multiple Custom Methods for Array Operations

console.log("question 2")
function filterEvenNumbers(arr) {
    return arr.filter((ele,i)=>ele%2==0)
}

function sumOfArray(arr) {
    let sum = arr.reduce((acc,curr)=>acc+curr,0);
    return sum
}

function sortAndConcat(arr1, arr2){
    arr1.sort((a,b)=>a-b);
    arr2.sort((a,b)=>a-b);
    
    return arr1.concat(arr2)
}

console.log(filterEvenNumbers(arr))
console.log(sumOfArray(arr))
let arr1=[7,4,8,9,1];
let arr2=[3,10,2,5,6];
console.log(sortAndConcat(arr1,arr2))


// Q: 13
// Title:
// L1 - Debugging an Array and String Manipulation Program


function manageStudents() {
    let students = ["Alice", "Bob", "Charlie"];

    // Add "David" at index 1
    students.splice(1, 0, "David");
            

    // Check if "Eve" is in the list
    console.log(students.includes("Eve"));  // Should return false

    // Convert the array to a string with names separated by commas
    console.log(students.join(","));  // Expected: "Alice,David,Bob,Charlie"
}

manageStudents();