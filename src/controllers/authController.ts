import { Request, Response } from 'express';
import { User } from '../models/User.js'; // Assuming you have a User model exported as default
import jwt from 'jsonwebtoken';

// Route to verify token and get user info
export const verifyJwt = async (req: Request, res: Response): Promise<void> => {
    try {
        // Assuming the token has user ID, fetch user data from the database
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the user object

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // If the user is found and token is valid, return user data
        res.status(200).json({
            user: { id: req.user.userId, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for user signup
export const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, email, role, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Create new user
        const user = new User({ name, email, role, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email }
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Error during signup', error });
    }
};

// Controller for user login
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password); // Assuming comparePassword is defined in User model
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login', error });
    }
};
