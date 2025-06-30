const express = require("express");
const userRouter = require("./routes/user.route");
const connecttoDB = require("./config/db");
const app = express();
app.use(express.json());

app.use("/users",userRouter);

app.listen(3000,async()=>{
    await connecttoDB();
    console.log("server runing on Port,3000");
})
