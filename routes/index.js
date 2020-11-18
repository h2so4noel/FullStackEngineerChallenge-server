import express from 'express';
import reviewRepository from '../repositories/ReviewRepository.js';

const app = express.Router();

app.get('/', (req, res) => {
  reviewRepository.findAll().then((reviews) => {
    res.json(reviews);
  }).catch((error) => console.log(error));
});

app.post('/', (req, res) => {
  const { taskName, content } = req.body;
  console.log(req.body);
  reviewRepository.create(taskName, content).then((review) => {
    res.json(review);
  }).catch((error) => console.log(error));
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  reviewRepository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`deleted with id: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const review = { name: req.body.taskName, done: req.body.content };
  reviewRepository.updateById(id, review)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});

export default app;