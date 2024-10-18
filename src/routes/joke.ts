import { Request, Response, Router } from 'express';
import Joke from '../models/Joke.js';
import User from '../models/User.js';

const router = Router();

// Get all Jokes
router.get('/', async (req: Request, res: Response) => {
    try {
        const jokes = await Joke.find({});
        if (jokes) {
            res.status(200).json({ jokes });
        } else {
            res.status(404).json({ error: 'Jokes Not Found!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Get individual Joke
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const joke = await Joke.findOne({ _id: id });
        if (joke) {
            res.status(200).json({ joke });
        } else {
            res.status(404).json({ error: 'Joke Not Found!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Delete individual Joke
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Joke.deleteOne({ _id: id });
        res.status(200).json({ success: 'Joke Deleted Successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Create new Joke
router.post('/', async (req: Request, res: Response) => {
    try {
        const { joke, creatorId } = req.body;
        const newJoke = await Joke.create({ joke, creatorId });
        if (newJoke) {
            res.status(200).json({ success: 'Joke Created Successfully', newJoke });
        } else {
            res.status(404).json({ error: 'Joke Creation Unsuccessfull!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Create new Joke
router.patch('/:id', async (req: Request, res: Response) => {
    try {
        const { joke } = req.body;
        const { id } = req.params;
        const updatedJoke = await Joke.findByIdAndUpdate(id, { joke });
        if (updatedJoke) {
            res.status(200).json({ success: 'Joke Updated Successfully', updatedJoke });
        } else {
            res.status(400).json({ error: 'Joke Updation Unsuccessfull!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

export default router;