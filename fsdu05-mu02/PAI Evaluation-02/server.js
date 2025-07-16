const express=require('express');
const connecttoDB = require('./config/db');
const UserRouter = require('./routers/user.router');
const BookRouter = require('./routers/book.router');
const AuthorRouter = require('./routers/author.router');
const StatsRouter = require('./routers/stats.router');
require('dotenv').config();
const app=express();
app.use(express.json());


app.use('/api/v1/auth',UserRouter);
app.use('/api/v1/books',BookRouter);
app.use('/api/v1/authors',AuthorRouter);
app.use('/api/v1/stats',StatsRouter);

app.listen(3000,async()=>{
    await connecttoDB()
    console.log("server running on 3000")
})