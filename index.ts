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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import and mount routes
import authRoutes from './src/routes/auth.js';
import jokeRoutes from './src/routes/joke.js';

app.use('/api/auth', authRoutes);
app.use('/api/jokes', jokeRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend running at port", process.env.PORT);
});