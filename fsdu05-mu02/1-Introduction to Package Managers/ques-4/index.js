import express from 'express';
import { getFileInfo } from './fileinfo.js';
import { parseUrlDetails } from './urlparser.js';
// import getFileInfo from './fileinfo.js';
const app=express();
const port =3000;

app.get('/test',(req,res)=>{
    res.send("Test route is working!")
})

app.get('/fileinfo',(req,res)=>{
  const { filepath } = req.query;
  if (!filepath) {
    return res.status(400).json({ error: 'Missing "filepath" query parameter.' });
  }
  try{
    const fileInfo = getFileInfo(filepath);
    res.json(fileInfo);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
})

app.get('/parseurl',(req,res)=>{
  const { url: fullUrl } = req.query;
  if (!fullUrl) {
    return res.status(400).json({ error: 'Missing "url" query parameter.' });
  }
  try{
    const urlInfo = parseUrlDetails(fullUrl);
    res.json(urlInfo);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
})

app.listen(port,()=>{
    console.log('server running on 3000')
})

