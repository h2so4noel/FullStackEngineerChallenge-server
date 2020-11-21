import express from 'express';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

// Users:
// get all users

// Reviews:
// get all review entries
router.get('/reviews', reviewController.findAll);
// create a review
router.post('/reviews/:id', reviewController.create);
// delete a review
router.delete('/reviews/:id', reviewController.delete);
// edit a review
router.put('/reviews/:id', reviewController.update);

export default router;