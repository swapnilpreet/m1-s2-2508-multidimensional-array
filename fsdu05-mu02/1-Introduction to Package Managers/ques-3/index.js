import express from 'express';
import { readFile } from './read.js';
import os, { hostname } from 'os';
import dns from 'dns';

const app=express();

const port=3000;

app.get('/test',(req,res)=>{
    res.send("Test route is working!")
})

app.get('/readfile',(req,res)=>{
    const data=readFile();
    res.send(data)
})

app.get('/systemdetails',(req,res)=>{
    const platform = os.platform();
    const totalMemory = (os.totalmem()/(1024**3)).toFixed(2)+'GB';
    const freeMemory = (os.freemem()/(1024**3)).toFixed(2)+'GB';
    const cpuModel = os.cpus()[0].model;
    res.json({
    platform,
    totalMemory,
    freeMemory,
    cpuModel
  });
})

app.get('/getip',(req,res)=>{
    dns.lookup('masaischool.com',(err,address)=>{
        if(err){
            res.status(500).json({error:"failed to resolve hostname"})
        }else{
            res.json({hostname:'masaischool.com',ipAddress:address})
        }
    });
})


app.listen(port,()=>{
    console.log("Server is running on http://localhost:3000")
})