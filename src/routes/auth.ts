import { Router, Request, Response } from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) {
            res.status(201).json({ error: 'User already exists' });
        }

        const newUser = await User.create({ name, email, password });
        const userResponse = newUser.toObject();
        delete userResponse.password;

        if (newUser) {
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });
            res.status(200).json({ success: 'User created successfully', token, user: userResponse });
        } else {
            res.status(400).json({ error: 'User creation failed!' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({ error: 'invalid credentials' });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

            const userResponse = user.toObject();
            delete userResponse.password;

            res.status(201).json({ success: 'User logged in successfully', token, user: userResponse });
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: error })
    }
});

router.get('/verifyToken', authMiddleware, async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;