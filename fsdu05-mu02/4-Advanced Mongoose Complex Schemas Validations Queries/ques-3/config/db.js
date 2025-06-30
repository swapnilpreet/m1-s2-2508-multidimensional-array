const mongoose=require("mongoose");
require('dotenv').config();

const connecttoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error occured in DB connection");
        console.log(error);
    }
}
module.exports=connecttoDB;
