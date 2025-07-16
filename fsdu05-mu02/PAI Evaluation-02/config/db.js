const mongoose=require('mongoose');


const connecttoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DataBase Connected")
    } catch (error) {
        console.log("Connection failed",error)
    }
}

module.exports=connecttoDB;