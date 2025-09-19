let products = [
  { id: 1, name: "Laptop", price: 60000, category: "Electronics" },
  { id: 2, name: "Shoes", price: 2000, category: "Fashion" },
  { id: 3, name: "Phone", price: 40000, category: "Electronics" }
];

let [first,second,...rest]=products

// console.log(first,second,rest)

function addProduct(name="sumsung s24 ultra",price=145125,category="Electronics"){
    let newproduct={id:Date.now(), name,price,category}
    products = [...products,newproduct];
    return newproduct;
}

console.log(addProduct("iphone 17 Pro",152000,"Electronics"))
console.log(addProduct("vivo 17 Pro"))

function getProductsByCategory(...category){
    let ans=products.filter((pro)=>(
        category.includes(pro.category)
    ))
    return ans;
}

console.log(getProductsByCategory("Electronics","Fashion"))

function printproducts(){
    products.forEach((pro)=>{
        console.log(`Product: ${pro.name} | Price: ${pro.price} | Category: ${pro.category}`);
    })
}
printproducts();