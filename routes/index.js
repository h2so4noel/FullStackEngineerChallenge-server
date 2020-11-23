import express from 'express';
import userController from '../controllers/userController.js';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

// Users:
// get all user entries
router.get('/users', userController.findAll);
// get user by id
router.get('/users/:id', userController.findOne);
// create a user
router.post('/users', userController.create);
// edit a user
router.put('/users/:id', userController.update);
// delete a user
router.delete('/users/:id', userController.delete);
// delete all users
router.delete('/users', userController.deleteAll);

// Reviews:
// get all review entries
router.get('/reviews', reviewController.findAll);
// create a review
router.post('/reviews', reviewController.create);
// edit a review
router.put('/reviews/:id', reviewController.update);
// delete a review
router.delete('/reviews/:id', reviewController.delete);
// delete all reviews
router.delete('/reviews', reviewController.deleteAll);

export default router;