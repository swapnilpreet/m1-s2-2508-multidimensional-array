import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import connecttoDB from './config/db.js';
import './jobs/bulkBookJob.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', authRoutes);
app.use('/api', bookRoutes);

app.listen(3000,()=>{
    connecttoDB();
    console.log("surver rinning on 3000")
})