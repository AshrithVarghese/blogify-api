import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send("Welcome to blog api");
})
app.use('/api/user', authRoutes);
app.use('/api/posts', postRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
