
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
