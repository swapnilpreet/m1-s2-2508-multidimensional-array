import mongoose from 'mongoose';


const connectDB=async():Promise<void>=>{
    try {
        const connection=await mongoose.connect(process.env.MONGO_URI as string);
        console.log("mongoDb connected")
    } catch (error) {
        console.log("MongoDB connection failed",error);
        process.exit(1)
    }
};

export default connectDB;