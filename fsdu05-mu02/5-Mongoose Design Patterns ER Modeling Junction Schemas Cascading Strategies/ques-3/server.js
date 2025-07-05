const express =require('express');
const connecttoDB = require('./config/db');
const mentorRoutes = require('./router/mentorRoutes');
const learnerRoutes = require('./router/learnerRoutes');
const sessionRoutes = require('./router/sessionRoutes');

const app=express();
app.use(express.json());

const PORT=3000;


app.use('/test',(req,res)=>{
    res.status(200).json({msg:"this is testing route"})
});

app.use('/mentors', mentorRoutes);
app.use('/learners', learnerRoutes);
app.use('/sessions', sessionRoutes);

app.listen(PORT,async()=>{
    await connecttoDB();
    console.log(`Server runing on ${PORT}`);
})