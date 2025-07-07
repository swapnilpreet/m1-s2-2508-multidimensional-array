const express=require("express");
const UserRouter = require("./route/user.router");
const authMiddleware = require("./middleware/authMiddleware");
const connecttoDB = require("./config/db");
require('dotenv').config();
const app=express();
app.use(express.json());

app.use('/user',UserRouter)

app.get('/home', authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.listen(3000,async()=>{
    await connecttoDB();
    console.log("Server ruuning on 3000")
})