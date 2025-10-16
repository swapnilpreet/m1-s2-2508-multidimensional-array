// // let str="swapnil";
// // let obj={};

// // // Example: Fetch all products
// // fetch("https://api.example.com/products")
// //   .then(response => response.json())  // convert response to JSON
// //   .then(data => {
// //     console.log("All Products:", data);
// //   })
// //   .catch(error => console.error("Error:", error));

// // // Example: Fetch product by ID
// // let productId = 123;

// // fetch(`https://api.example.com/products/${productId}`)
// //   .then(response => response.json())
// //   .then(data => {
// //     console.log(`Product ${productId}:`, data);
// //   })
// //   .catch(error => console.error("Error:", error));

// // // Example: Create a new product
// // let newProduct = {
// //   name: "Laptop",
// //   price: 750,
// //   category: "Electronics"
// // };

// // fetch("https://api.example.com/products", {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json"
// //   },
// //   body: JSON.stringify(newProduct)
// // })
// //   .then(response => response.json())
// //   .then(data => {
// //     console.log("Created Product:", data);
// //   })
// //   .catch(error => console.error("Error:", error));

// // // Example: Update product with ID = 123
// // let updatedProduct = {
// //   name: "Gaming Laptop",
// //   price: 1000,
// //   category: "Electronics"
// // };

// // fetch("https://api.example.com/products/123", {
// //   method: "PUT",
// //   headers: {
// //     "Content-Type": "application/json"
// //   },
// //   body: JSON.stringify(updatedProduct)
// // })
// //   .then(response => response.json())
// //   .then(data => {
// //     console.log("Updated Product:", data);
// //   })
// //   .catch(error => console.error("Error:", error));

// // // Example: Update only price of product with ID = 123
// // let partialUpdate = {
// //   price: 1200
// // };

// // fetch("https://api.example.com/products/123", {
// //   method: "PATCH",
// //   headers: {
// //     "Content-Type": "application/json"
// //   },
// //   body: JSON.stringify(partialUpdate)
// // })
// //   .then(response => response.json())
// //   .then(data => {
// //     console.log("Partially Updated Product:", data);
// //   })
// //   .catch(error => console.error("Error:", error));

// // // Example: Delete product with ID = 123
// // fetch("https://api.example.com/products/123", {
// //   method: "DELETE"
// // })
// //   .then(response => {
// //     if (response.ok) {
// //       console.log("Product deleted successfully");
// //     } else {
// //       console.log("Failed to delete product");
// //     }
// //   })
// //   .catch(error => console.error("Error:", error));

// // const bcrypt =require("bcrypt")

// // async function solve(){
// //   const hashedpassword= await bcrypt.hash("swapnil",10);
// //   console.log(hashedpassword)
// // }

// // solve();

// // jwt
// // import jwt from 'jsonwebtoken'
// const jwt= require("jsonwebtoken")
// const token =jwt.sign({username:"swapnil",role:"admin"},"secretkey-swapnil",{expiresIn:'1h'})
// console.log(token)
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN3YXBuaWwiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTU4NTI4NzUsImV4cCI6MTc1NTg1NjQ3NX0.puFEdTUorxv1srChzjolL-2jgo472k-9KRUWKWWkqlM

// jwt.verify(token,"secretkey-swapnil",(err,user)=>{
//   if(err){
//     console.log("error occured")
//   }else{
//     console.log(user)
//   }
// })

// const bcrypt =require('bcrypt');

// async function solve(){
//   const hashpassowrd=await bcrypt.hash("swapnil",10);
//   console.log(hashpassowrd)

//   const checkuser=await bcrypt.compare("swapnil",hashpassowrd)
//   console.log(checkuser)
// }

// solve()

// const mongoose =require('mongoose');

// const UserSchema=new mongoose.Schema({
//   name:{
//     type:String,
//     required:true,
//   },
//   age:{
//     type:Number,
//     required:true,
//   },
//   email:{
//     type:String,
//     require:true,
//     unique:true
//   },
//   Subject:{
//     type:String,
//     enum:['math','science',"english"]
//   }
// })

// const UserModel=mongoose.model("User",UserSchema);
// // export default UserModel;

// const AuthorSchema=new mongoose.Schema({
//   name:{
//     type:String,
//     required:true,
//   }
// })

// const AuthorModel=mongoose.model("Author",AuthorSchema)
// // export default AuthorModel;

// const BookSchema=new mongoose.Schema({
//   title:{
//     type:String,
//     required:true,
//   },
//   year:{
//     type:Number,
//     required:true,
//   },
//   author:{
//     type:mongoose.Schema.Types.ObjectId, ref:"Author"
//   }
// })
// const BookModel=new mongoose.model("Book",BookSchema)
// export default BookModel;




// console.log('swa')




// function reverse(str) {
//     function solve(ind){
//         if(ind<0){
//             return ""
//         }
//         return str[ind]+solve(ind-1)
//     }
//     return solve(str.length-1)
// }

// console.log(reverse("Swapnil"))




function solve(n) {
  let board=Array(n).fill().map(()=>Array(n).fill(0));
  let count=0;

  function isSafe(r,c){
    for (let i=0;i<r;i++) {
      if (board[i][c]===1) return false;
    }
    for (let i=r-1,j=c-1;i>=0&&j>=0;i--,j--){
      if (board[i][j]===1) return false;
    }
    for (let i=r-1,j=c+1;i>=0&&j<n;i--,j++){
      if(board[i][j]===1)return false;
    }
    return true;
  }

  function solve1(r){
    if (r===n) {
      count++;
      return;
    }
    for (let c=0;c<n;c++) {
      if (isSafe(r,c)){
        board[r][c]=1;
        solve1(r+1);
        board[r][c]=0;
      }
    }
  }
  solve1(0);
  return count;
}