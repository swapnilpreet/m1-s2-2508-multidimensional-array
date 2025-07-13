const mongoose=require('mongoose');
require('dotenv').config();

const ConnecttoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection to DB");
    } catch (error) {
        console.log("Error Occured in connect DB");
        console.log(error);
    }
}

module.exports=ConnecttoDB;