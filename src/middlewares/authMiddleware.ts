import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Request, Response, NextFunction } from 'express';

// Define an interface for the decoded JWT payload
interface DecodedToken {
    id: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized, no token provided' });
        } else {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken; // Ensure you have a secret for signing JWTs
            req.user = await User.findById(decoded.id).select('-password'); // Attach user to request

            if (!req.user) {
                res.status(401).json({ message: 'User not found' });
            }

            next(); // Proceed to the next middleware or route handler
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
}

export default authMiddleware;