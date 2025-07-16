import mongoose from 'mongoose';
import colors from 'colors';
// import dotenv from 'dotenv';
// dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;