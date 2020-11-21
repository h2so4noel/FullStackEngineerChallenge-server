import { Review } from '../models/index.js'

const reviewController = {};

reviewController.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({ 
      message: "Invalid body.content (can't create review without content)" 
    });
  }

  const review = new Review({
    content: req.body.content,
    taskName: req.body.taskName,
  });

  review.save(review).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error while creating review." 
      });
    });
}

reviewController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ 
      message: "Invalid body (empty)" 
    });
  }

  const id = req.params.id;

  Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({ message: "Review not found with id: " + id });
    } else {
      res.send({ message: "Review updated." });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating review with id:" + id 
    });
  });
}

reviewController.findAll = (req, res) => {
  console.log('find all reviews: ');
  // const title = req.query.title;
  // const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  // Review.find(condition)
  Review.find().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error while retrieving all reviews."
    });
  });
}

reviewController.findOne = (req, res) => {
  const id = req.params.id;

  Review.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ 
        message: "Review not found with id: " + id 
      });
    } else res.send(data);
  }).catch(err => {
    res.status(500).send({ 
      message: "Error while retrieving Review with id:" + id 
    });
  });
}

reviewController.delete = (req, res) => {
  const id = req.params.id;

  Review.findByIdAndRemove(id).then(data => {
    if (!data) {
      res.status(404).send({
        message: "Review not found with id: " + id
      });
    } else {
      res.send({
        message: "Review was deleted successfully."
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: "Error while deleting Review with id:" + id
      });
    });
};

export default reviewController;