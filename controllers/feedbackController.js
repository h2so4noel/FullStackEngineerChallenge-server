import mongoose from 'mongoose';
import { Feedback, User, Review } from '../models/index.js'

const feedbackController = {};

feedbackController.create = (req, res) => {
  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    review: req.body.review,
    assignedUser: req.body.assignedUser,
    pending: true,
    content: '',
  });

  feedback.save(feedback).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error while creating feedback." 
    });
  });

  User.findOneAndUpdate(
    { '_id' : feedback.assignedUser }, 
    { $push: { assignedFeedbacks: feedback._id } },
    {upsert: true}, 
    (err) => {
      if (err) return console.log(err + review._id);
    }
  );

  Review.findOneAndUpdate(
    { '_id' : feedback.review }, 
    { $push: { feedbacks: feedback._id } },
    {upsert: true}, 
    (err) => {
      if (err) return console.log(err + review._id);
    }
  );
}

feedbackController.findAllByReviewId = (req, res) => {
  const reviewId = req.query.reviewId;
  const condition = reviewId ? { review: reviewId } : {};

  Feedback.find(condition)
    .populate('assignedUser')
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({ message: err.message || "Error while retrieving all reviews." });
    });
}

feedbackController.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ 
      message: "Invalid body (empty)" 
    });
  }

  const id = req.params.id;
  const body = {
    content: req.body.content,
    pending: false,
  }

  Feedback.findByIdAndUpdate(id, body, { useFindAndModify: false })
    .populate('assignedUser')
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Feedback not found with id: " + id });
      } else {
        res.send(data);
      }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating feedback with id:" + id 
    });
  });
}

export default feedbackController;