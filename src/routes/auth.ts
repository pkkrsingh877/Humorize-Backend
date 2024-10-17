import { Router, Request, Response } from 'express';
import User from '../models/User.js';
import { error } from 'console';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            res.status(400).json({ error: 'invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '30d' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error })
    }
});

module.exports = router;