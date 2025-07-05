const express =require('express');
const connecttoDB = require('./config/db');
const doctorRoutes = require('./router/doctorRoutes');
const patientRoutes = require('./router/patientRoutes');
const consultationRoutes = require('./router/consultationRoutes');

const app=express();
app.use(express.json());

const PORT=3000;


app.use('/test',(req,res)=>{
    res.status(200).json({msg:"this is testing route"})
});

app.use('/doctors',doctorRoutes)
app.use("/patients",patientRoutes)
app.use("/consultations",consultationRoutes)

app.listen(PORT,async()=>{
    await connecttoDB();
    console.log(`Server runing on ${PORT}`);
})