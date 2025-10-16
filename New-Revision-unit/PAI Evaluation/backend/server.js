const express =require('express');
const mongoose=require('mongoose');
const cors=require("cors");
const dotenv=require('dotenv');
const connectDB = require('./config/db');
const authroute=require('./routes/auth')
const courseroute=require('./routes/courses')
const enrollmentroute=require('./routes/enrollments')
dotenv.config();


const app=express();
app.use(cors());
app.use(express.json());


app.use("/api/auth",authroute);
app.use('/api/courses',courseroute)
app.use('/api/enrollments',enrollmentroute)


app.listen(5000,async()=>{
    await connectDB()
    console.log("server runing on port 5000")
})