import { Feedback } from '../models/index.js'

const feedbackController = {};

feedbackController.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({ 
      message: "Invalid body.content (can't create feedback without content)" 
    });
  }

  const feedback = new Feedback({
    reviewId: req.body.reviewId,
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
}

export default feedbackController;