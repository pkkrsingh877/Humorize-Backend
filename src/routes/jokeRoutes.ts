import express from 'express';
// import { } from '../controllers/userController.ts';
const router = express.Router();

// Get all jokes
router.get('/jokes');
// Post new joke
router.post('/jokes');
// Update a joke
router.patch('/jokes/:id');
// Delete a joke
router.delete('/jokes/:id');

export default router;