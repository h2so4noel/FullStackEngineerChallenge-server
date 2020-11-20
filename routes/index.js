import express from 'express';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

// get all review entries
router.get('/', reviewController.findAll);

// create a review
router.post('/', reviewController.create);

// // delete a review
// router.delete('/:id', reviewController.delete);

// // edit a review
// router.put('/:id', reviewController.update);

export default router;