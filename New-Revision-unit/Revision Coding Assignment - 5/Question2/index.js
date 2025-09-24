Array.prototype.myMap = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

const nums = [1, 2, 3];
console.log(nums.myMap((x)=>x*2));
Array.prototype.mySort = function () {
    let arr = this;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
};
console.log([3, 1, 4, 2].mySort());
console.log(["banana", "apple", "cherry"].mySort());
String.prototype.myStartsWith = function (word, pos) {
    pos = pos || 0;
    for (let i = 0; i < word.length; i++) {
        if (this[pos + i] !== word[i]) {
            return false;
        }
    }
    return true;
};
console.log("Hello World".myStartsWith("Hello")); 
console.log("Hello World".myStartsWith("World", 6));
console.log("Hello World".myStartsWith("Hi"));
