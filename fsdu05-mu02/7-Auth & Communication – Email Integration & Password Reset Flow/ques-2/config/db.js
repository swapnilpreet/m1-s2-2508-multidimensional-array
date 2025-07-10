const mongoose=require('mongoose');
require("dotenv").config();

const connecttoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connecting to DB");
    } catch (error) {
        console.log("Error Occured in Connecting-DB");
        console.log(error)
    }
}
module.exports=connecttoDB;
