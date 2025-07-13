const express =require('express');
const connectToDB = require('./config/db');
const UserRouter = require('./routes/user.route');
const app=express();
app.use(express.json());
require('dotenv').config();

// console.log(process.env.PORT)
const PORT=process.env.PORT || 5000

app.get('/test',(req,res)=>{
    try {
        res.status(200).json({message:"this is test route"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
})

app.use('/users',UserRouter);

// app.use((req,res)=>{
//     try {
//         res.status(200).json({message:"not found any route"})
//     } catch (error) {
//         res.status(500).json({message:"something went wrong"})
//     }
// })

app.listen(PORT,async()=>{
    await connectToDB();
    console.log("server runing on",PORT)
})