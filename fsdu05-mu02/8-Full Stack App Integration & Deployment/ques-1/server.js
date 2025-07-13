const express=require('express');
const ConnecttoDB = require('./config/db');
const AuthRouter = require('./routes/auth.route');
const ResourceRouter = require('./routes/resource.route');
const userRouter = require('./routes/user.route');
const app=express();
app.use(express.json());
require('dotenv').config();


app.use('/api/auth',AuthRouter)
app.use('/api/resource',ResourceRouter)
app.use('/api/user',userRouter)

app.listen(3000,async()=>{
    await ConnecttoDB();
    console.log("Server is runing 3000");
})