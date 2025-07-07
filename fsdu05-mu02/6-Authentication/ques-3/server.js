const express=require("express");
const connecttoDB = require("./config/db");
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
require('dotenv').config();
const app=express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/blogs', blogRoutes);

 

app.listen(3000,async()=>{
    await connecttoDB();
    console.log("Server ruuning on 3000")
})