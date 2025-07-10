const express=require("express");
const UserRouter = require("./route/user.router");
const connecttoDB = require("./config/db");
require('dotenv').config();
const app=express();
app.use(express.json());

app.use('/user',UserRouter)


app.listen(3000,async()=>{
    await connecttoDB();
    console.log("Server ruuning on 3000")
})