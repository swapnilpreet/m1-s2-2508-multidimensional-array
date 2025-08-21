import mongoose from "mongoose"


const connecttoDB=async()=>{
    try {
        const connection=await mongoose.connect("mongodb://127.0.0.1:27017/user");
        console.log("conneted successful")
    } catch (error) {
        console.log("conntection failed")
    }
}

export default connecttoDB;
