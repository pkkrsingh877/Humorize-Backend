import express, { Request, Response, NextFunction } from 'express';
import { signup, login, verifyJwt } from '../controllers/authController.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Bearer token'

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any }; // Verify the token with your JWT_SECRET
        req.user = decoded; // Attach the decoded user info to the request object
        next();
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Verify JWT
router.get('/me', verifyToken, verifyJwt);

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

export default router;
