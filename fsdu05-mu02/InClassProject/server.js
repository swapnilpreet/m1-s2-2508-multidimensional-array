const express =require('express');
const connectToDB = require('./config/db');
const UserRouter = require('./routes/user.route');
const TodoRoute = require('./routes/todo.route');
const app=express();
app.use(express.json());
require('dotenv').config();

app.get('/test',(req,res)=>{
    try {
        res.status(200).json({message:"this is test route"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
})

// why create /login =>passport.authenticate('github', { failureRedirect: '/login' }), in case fail
app.get('/login',(req,res)=>{
    res.status(500).json({message:"error occured in o-auth github2"})
})

app.use('/users',UserRouter);
app.use('/todos',TodoRoute);



// app.use((req,res)=>{
//     try {
//         res.status(200).json({message:"not found any route"})
//     } catch (error) {
//         res.status(500).json({message:"something went wrong"})
//     }
// })

app.listen(3000,async()=>{
    await connectToDB();
    console.log("server runing on",3000)
})