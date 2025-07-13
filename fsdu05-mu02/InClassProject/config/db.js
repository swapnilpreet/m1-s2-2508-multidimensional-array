const mongoose=require('mongoose');
require('dotenv').config();

const connectToDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to DB")
    } catch (error) {
        console.log("Error coored while connecting to DB",error)
    }
}
module.exports=connectToDB;