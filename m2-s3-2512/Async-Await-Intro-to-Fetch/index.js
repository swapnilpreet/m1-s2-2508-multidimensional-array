// Q: 6
// L0 - Asynchronous Timer with Callback
// Problem Statement:

function timer(duration, callback) {
  setTimeout(() => {
    callback(`Timer of ${duration} ms finished`);
  }, duration);
}

function onComplete(message) {
  console.log(message);
}
timer(2000, onComplete);

//  Q: 7
// Title:
// L0 - Fetch and Display Users

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => data.forEach((users) => console.log(users.name)));

//   Q: 8
// Title:
// L1 - Fetch and Display Products with Error Handling

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const product = await response.json();
    // console.log();
    product.forEach((product) =>
      console.log(`name: ${product.title}, price: ${product.price}`)
    );

    const totalprice = products.reduce(
      (acc, ele) => acc + ele.price,
      0
    );


    console.log(`Total Price $${totalprice.toFixed(2)}`);
  } catch (error) {
    console.error(error.message);
  }
}

fetchProducts();
