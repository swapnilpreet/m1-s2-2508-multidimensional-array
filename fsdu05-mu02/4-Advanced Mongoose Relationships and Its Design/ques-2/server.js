const express =require('express');
const connecttoDB = require('./config/db');
const BookRouter = require('./router/book.route');
const UserRouter = require('./router/user.route');
const app=express();
app.use(express.json());

const PORT=3000;



app.use('/test',(req,res)=>{
    res.status(200).json({msg:"this is testing route"})
});

app.use('/user',UserRouter)
app.use("/book",BookRouter)

app.listen(PORT,async()=>{
    await connecttoDB();
    console.log(`Server runing on ${PORT}`);
})