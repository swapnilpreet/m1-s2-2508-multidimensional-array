const express=require('express');
const connecttoDB = require('./config/db');
const UserRouter = require('./routers/user.router');
require('dotenv').config();
const app=express();
app.use(express.json());


app.use('/api/v1/auth',UserRouter);



app.listen(3000,async()=>{
    await connecttoDB()
    console.log("server running on 3000")
})