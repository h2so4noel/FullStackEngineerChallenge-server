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
    { $push: { feedbacks: feedback._id } },
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

export default feedbackController;