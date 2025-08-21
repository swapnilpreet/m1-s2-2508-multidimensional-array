import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import studentRoutes from './routes/studentRoutes'


dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());


app.use('/',studentRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server running on port 3000")
})