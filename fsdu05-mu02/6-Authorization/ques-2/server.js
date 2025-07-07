require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connecttoDB = require('./config/db');
const app = express();

app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));

app.listen(3000, async() =>{
    await connecttoDB()
    console.log('Server running at http://localhost:3000')}
);
