import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Import and mount routes
import authRoutes from './routes/authRoutes.js';
import jokeRoutes from './routes/jokeRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/jokes', jokeRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend running at port", process.env.PORT);
});