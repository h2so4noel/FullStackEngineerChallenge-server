import express from 'express';
import userController from '../controllers/userController.js';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

// Users:
// get all user entries
router.get('/users', userController.findAll);
// create a user
router.post('/users', userController.create);
// delete a user
router.delete('/users/:id', userController.delete);

// Reviews:
// get all review entries
router.get('/reviews', reviewController.findAll);
// create a review
router.post('/reviews', reviewController.create);
// delete a review
router.delete('/reviews/:id', reviewController.delete);
// edit a review
router.put('/reviews/:id', reviewController.update);

export default router;