const books = require('./addBook')

let print = books.map((ele)=>ele.getSummary());

console.log(print)

// step 1: printbook.js
// step 2: addBook.js
// step 3: Book.js

