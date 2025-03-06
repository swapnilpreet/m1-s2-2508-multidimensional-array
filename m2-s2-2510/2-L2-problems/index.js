
// questions 1
function digitallibrary() {
  let ans = [];
  return {
    AddBooks: function (book) {
      ans.push(book);
      return ans;
    },
    RemoveBooks: function (book) {
      ans = ans.filter((ele) => ele !== book);
      return ans;
    },
    Searchbooks: function (book) {
      let checkbook = ans.includes(book);
      return checkbook
        ? "books are avilable in library"
        : "books not found in library";
    },
    Findoccurrence: function (book) {
      let first = ans.indexOf(book);
      let last = ans.lastIndexOf(book);
      if (first > 0 && last > 0) {
        return `first book found in ${first} number and the last book present in ${last} number`;
      } else {
        return `Books not found ${first} & ${last}`;
      }
    },
    ExtractBooks: function (num) {
      let Extract = ans.slice(num);
      return Extract;
    },
    sortBooks: function () {
      return ans.sort();
    },
    Replaceabook: function (replaceIndex, newbook) {
      ans.splice(replaceIndex, 1, newbook);
      return ans;
    },
    joinBooks: function () {
      let joined = ans.join(", ");
      return joined;
    },
  };
}
const library = digitallibrary();
console.log(library.AddBooks("english"));
console.log(library.AddBooks("pali"));
console.log(library.AddBooks("Math"));
console.log(library.AddBooks("science"));
console.log(library.AddBooks("hindi"));
console.log(library.AddBooks("marathi"));
console.log(library.AddBooks("urdu"));
console.log(library.RemoveBooks("urdu"));
console.log(library.Searchbooks("pali"));
console.log(library.AddBooks("pali"));
console.log(library.Findoccurrence("vijay"));
console.log(library.ExtractBooks(2));
console.log(library.sortBooks());
console.log(library.Replaceabook(2, "molecualr"));
console.log(library.joinBooks());



// questions 2

function sortNames(namesArray) {
  namesArray.sort();
  console.log(namesArray);
}

sortNames(["Charlie", "Alice", "Bob"]);


// Q: 3
// Title:
// L2 - Binding Method in Constructor Function

function Person(name,age) {
  this.name = name;
  this.age = age;
  this.displayInfo=function() {
    console.log(this.name,this.age);
  }
}


const Person1 = new Person("swapnil",45)
Person1.displayInfo()


// Q: 4
// Title:
// L2 - Building a Countdown Timer with Both setTimeout and setInterval

function countdowntimer(second) {
    let time=second;
    let timestart =setInterval(() => {
    console.log("Timed reaming",time);
    time--;
    if(0 > time){
      clearInterval(timestart);
      console.log("Countdown complete!");
    }
  }, 1000);
}

countdowntimer(10);


// Q: 5
// Title:
// L2 - Building a Library Management System Using Factory Functions

function Book(title,author){
  return{
    title,
    author,
    details(){
      console.log(`Title: ${this.title}, Author: ${this.author}`)
    }
  };
}

function createLibrary() {
  const books = [];

  return {
    addBook:function(book){
      books.push(book);
    },
    removeBook:function(title){
      const index=books.findIndex((book)=>book.title==title);

      if(index !== -1){
        books.splice(index,1);
      }
    },
    listBooks: function(){
      books.forEach((book)=>book.details());
    }
  }
}

let librarys = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

librarys.addBook(book1);
librarys.addBook(book2);

librarys.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee
// Title: 1984, Author: George Orwell

librarys.removeBook("1984");
librarys.listBooks();
// Output:
// Title: To Kill a Mockingbird, Author: Harper Lee