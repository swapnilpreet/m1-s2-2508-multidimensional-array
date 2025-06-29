const express =require('express');
const connecttoDB = require('./config/db');
const libraryRoutes = require('./router/libraryRoutes');
const app=express();
app.use(express.json());
const PORT=3000;


app.use('/test',(req,res)=>{
    res.status(200).json({msg:"this is testing route"})
});

app.use('/api', libraryRoutes);

app.listen(PORT,async()=>{
    await connecttoDB();
    console.log(`Server runing on ${PORT}`);
})