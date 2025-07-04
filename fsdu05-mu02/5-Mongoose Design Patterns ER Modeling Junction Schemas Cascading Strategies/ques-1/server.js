const express =require('express');
const connecttoDB = require('./config/db');
const StudentRouter = require('./routes/student.route');
const EnrollRouter = require('./routes/enroll.route');
const CourseRouter = require('./routes/course.route');
const app=express();
app.use(express.json());

const PORT=3000;



app.use('/test',(req,res)=>{
    res.status(200).json({msg:"this is testing route"})
});

app.use('/students',StudentRouter)
app.use("/courses",CourseRouter)
app.use("/enroll",EnrollRouter)

app.listen(PORT,async()=>{
    await connecttoDB();
    console.log(`Server runing on ${PORT}`);
})