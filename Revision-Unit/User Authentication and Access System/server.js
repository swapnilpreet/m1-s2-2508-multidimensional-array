import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connecttoDB from './config/db.js';
import authRoutes from "./router/user.route.js";

dotenv.config();
const app=express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000,async()=>{
    await connecttoDB();
    console.log("server runing on port 3000")
})