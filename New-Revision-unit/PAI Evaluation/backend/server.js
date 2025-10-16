const express =require('express');
const mongoose=require('mongoose');
const cors=require(cors);
const dotenv=require('dotenv');
dotenv.config();


const app=express();
app.use(cors());
app.use(express.json());


app.use("/api/auth");
app.use('/api/courses')
app.use('/api/enrollments')


app.listen(5000,()=>{
    console.log("server runing on port 5000")
})