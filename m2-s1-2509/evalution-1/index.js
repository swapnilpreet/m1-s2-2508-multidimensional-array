const products = [
  {
    id: 101,
    details: { name: "Laptop", price: 1200, category: "Electronics" },
    stock: { available: true, quantity: 4 },
    variants: [{ color: "Silver" }, { color: "Black" }],
  },
  {
    id: 102,
    details: { name: "Shoes", price: 150, category: "Fashion" },
    stock: { available: true, quantity: 10 },
    variants: [{ size: "M" }, { size: "L" }],
  },
  {
    id: 103,
    details: { name: "Smartphone", price: 800, category: "Electronics" },
    stock: { available: false, quantity: 0 },
    variants: [{ color: "Blue" }, { color: "Black" }],
  },
  {
    id: 104,
    details: { name: "Monitor", price: 300, category: "Electronics" },
    stock: { available: true, quantity: 2 },
    variants: [{ size: "24-inch" }, { size: "27-inch" }],
  },
];

function problem1(products) {
  let filterData = products?.filter(
    (ele) => ele?.details.category === "Electronics"
  );

  let filterData2 = filterData?.filter((ele) => ele?.stock?.available == true);
  // console.log(filterData)
  // console.log('........')
  // console.log(filterData2)
  let prodDeatails = filterData2.map((ele, i, products) => ({
    id: ele?.id,
    name: ele?.details?.name,
    price: ele?.details?.price,
    discountPrice: ele?.details.price - (10 / 100) * ele?.details.price,
    category: ele?.details.category,
  }));
    console.log(prodDeatails);
}

problem1(products);


console.log('question 2')
// Problem 2: Multi-User Authentication System (Closures & Abstraction)

function createUser(username, password) {
  let DBpassword = password;
  return {
    login: function (userpassword) {
      if (DBpassword === userpassword) {
        return `welcome, ${username}!`;
      } else {
        return `Incorrect password!`;
      }
    },
    changePassword: function (oldPassword, newPassword) {
      if (oldPassword === DBpassword) {
        oldPassword = newPassword;
        return;
      } else {
        return `Incorrect password! can not chnaged password`;
      }
    },
  };
}

const user1 = createUser("alice_01", "AlicePass!");

const user2 = createUser("bob_42", "BobSecure123");

console.log(user1.login("wrongPass")); // ❌ "Incorrect password!"
console.log(user1.login("AlicePass!"));



// Problem 3: Sales Analytics Dashboard (HOF - filter, map, reduce)
console.log('question 3')

const sales = [
  { product: "Laptop", amount: 2500, date: "2025-01-15", customer: "Alice" },
  { product: "Mouse", amount: 30, date: "2025-02-10", customer: "Bob" },
  {
    product: "Smartphone",
    amount: 900,
    date: "2025-02-15",
    customer: "Charlie",
  },
  { product: "Keyboard", amount: 150, date: "2025-02-18", customer: "David" },
  { product: "Monitor", amount: 400, date: "2025-02-20", customer: "Eve" },
  { product: "Headphones", amount: 220, date: "2025-02-22", customer: "Frank" },
];


let filteramount=sales.filter((ele)=>ele.amount>200)
console.log(filteramount);

let desc=filteramount.map((ele)=>`${ele.product} sold for $${ele.amount}`)
console.log(desc);


let sumtotal=filteramount.reduce((acc,ele)=>acc+ele.amount,0);

console.log(`Total Revenue: $${sumtotal}`);


// Problem 4: Text Analyzer & Word Frequency Counter (split, trim, map, filter, reduce, sorting)
console.log("question 4 ")

const review = `
  The laptop is amazing! I love it.
  The battery life is excellent, and the price is reasonable.
  Amazing product, highly recommended!
  Laptop is great, but battery could be better.
`;

function wordfrequencylist(review) {
    let ans=review.trim();
    console.log(ans);
    ans.split("");
    console.log(ans)
}

wordfrequencylist(review)