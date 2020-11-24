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
    revieweeUser: req.body.revieweeUser,
  });

  review.save(review).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Error while creating review." 
      });
    });
}

reviewController.findAll = (req, res) => {
  console.log('find all reviews: ');
  const condition = req.query.revieweeUser ? { revieweeUser: req.query.revieweeUser } : {};

  Review.find(condition)
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({ message: err.message || "Error while retrieving all reviews." });
    });
}

reviewController.findOne = (req, res) => {
  const id = req.params.id;

  Review.findById(id)
    .populate('revieweeUser')
    .populate({
      path: 'feedbacks',
      populate: {
        path: 'assignedUser',
        model: 'User',
      }
    })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Review not found with id: " + id });
      } else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error while retrieving Review with id:" + id });
    });
}

reviewController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ 
      message: "Invalid body (empty)" 
    });
  }

  const id = req.params.id;

  Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .populate('revieweeUser')
    .populate({
      path: 'feedbacks',
      populate: {
        path: 'assignedUser',
        model: 'User',
      }
    })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Review not found with id: " + id });
      } else {
        res.send(data);
      }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating review with id:" + id 
    });
  });
}

reviewController.delete = (req, res) => {
  const id = req.params.id;

  Review.findByIdAndRemove(id).then(data => {
    if (!data) {
      res.status(404).send({ message: "Review not found with id: " + id });
    } else {
      res.send({ message: "Review was deleted successfully." });
    }
  })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error while deleting Review with id:" + id });
    });
};

reviewController.deleteAll = (req, res) => {
  Review.deleteMany().then(data => {
    res.send({ message: 'Deleted all reviews successfully' });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Error while deleting all reviews" });
  })
}

export default reviewController;