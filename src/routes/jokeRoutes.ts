import express, { Request, Response } from 'express';
// import { } from '../controllers/userController.ts';
const router = express.Router();
import { Joke, JokeData } from '../models/Joke.js';
import { Schema } from 'mongoose';

// Get all jokes
router.get('/jokes', async (req: Request, res: Response) => {
    try {
        const jokes = await Joke.find({});
        res.json(res.status(200).json({ jokes }));
    } catch (error) {
        res.json(res.status(200).json({ 'message': 'Could Not Retrieve Jokes', error }));
    }
});
// Post new joke
router.post('/jokes', async (req: Request<{}, {}, JokeData>, res: Response) => {
    try {
        const { joke, creatorId } = req.body;
        const newJoke = await Joke.create({ joke, creatorId, createdAt: Date.now(), updatedAt: Date.now() });
        res.json(res.status(200).json({ newJoke }));
    } catch (error) {
        res.json(res.status(200).json({ 'message': 'Could Not Retrieve Jokes', error }));
    }
});
// Update a joke
router.patch('/jokes/:id');
// Delete a joke
router.delete('/jokes/:id');

export default router;