let obj = {
  name: "swapnil",
  email: "swapnil@gmail.com",
  address: {
    line: "VIP road Nagpur",
  },
};
let copyobj = deepClone(obj);
copyobj.address.line = "near library";
console.log(copyobj);
console.log(obj);

let arr = [1, 2, 5, 4, 5, 8, 85];
let copyarr = deepClone(arr);
arr[0] = 100;
console.log(arr);
copyarr.push(99)
console.log(copyarr);
function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

//   console.log(typeof value, Array.isArray(value));
  if (Array.isArray(value)) {
    let cloneArr = [];
    for (let i = 0; i < value.length; i++) {
      cloneArr[i] = deepClone(value[i]);
    }
    return cloneArr;
  } else {
    let cloneobj = {};
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        cloneobj[key] = deepClone(value[key]);
      }
    }
    return cloneobj;
  }
}
