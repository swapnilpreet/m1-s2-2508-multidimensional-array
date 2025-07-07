const express=require("express");
const connecttoDB = require("./config/db");
const noteRoutes = require("./routes/notes");
const authRoutes = require("./routes/auth");
require('dotenv').config();
const app=express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

 

app.listen(3000,async()=>{
    await connecttoDB();
    console.log("Server ruuning on 3000")
})