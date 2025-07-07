require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const connecttoDB = require("./config/db");
require("./auth/github");

const app = express();

app.use(passport.initialize());

app.use("/auth",require("./routes/auth"));

app.get("/",(req,res)=>res.send("GitHub Login API is running"));

const PORT=process.env.PORT||3000;

app.listen(PORT,async()=>{
  await connecttoDB();
  console.log('Visit http://localhost:3000/auth/github to start GitHub login');
  console.log(`Server on http://localhost:${PORT}`);
});
