const express=require('express');
const connecttoDB = require('./config/db');
const Userrouter = require('./routes/user.router');
const Profilerouter = require('./routes/profile.router');
const app=express();
app.use(express.json())


app.get("test",(req,res)=>{
    res.status(200).json({msg:"this is test route"})
})
app.use("/user",Userrouter);
app.use("/profile",Profilerouter);
app.listen(3000,async()=>{
    await connecttoDB();
    console.log("server started...3000")
})