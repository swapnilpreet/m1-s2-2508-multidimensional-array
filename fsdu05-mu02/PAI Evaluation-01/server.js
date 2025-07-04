const express=require("express");
const AuthorRouter = require("./routes/author.route");
const bookRouter = require("./routes/book.route");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorhandler");
const connecttoDB = require("./config/db");
const app=express();
app.use(express.json());
app.use(logger);


app.use('/author',AuthorRouter);
app.use("/books",bookRouter);

app.use((req,res,next)=>{
    res.status(404).json({msg:"route not Found"})
})

app.use(errorHandler);
app.listen(3000,async()=>{
    await connecttoDB()
    console.log("server runing on 3000 port");
})