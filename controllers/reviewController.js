import { Review } from '../models/index.js'

const reviewController = {};

reviewController.create = (req, res) => {
  // validate content body
  if (!req.body.content) {
    res.status(400).send({ message: "Invalid content (empty)." });
    return;
  }

  const review = new Review({
    content: req.body.content,
    taskName: req.body.taskName,
  })

  review
    .save(review)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while creating review."
      });
    });
}

reviewController.findAll = (req, res) => {
  Review.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while retrieving all reviews."
      });
    });
}

reviewController.findOne = (req, res) => {
  const id = req.params.id;

  Review.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Review not found with id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error while retrieving Review with id:" + id });
    });
};

export default reviewController;