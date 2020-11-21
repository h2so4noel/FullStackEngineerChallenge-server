import mongoose from 'mongoose';

const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    reviewId: String, // review this feedback was assigned to
    assignedUserId: String, // the user who this feedback is assigned to by admin
    pending: Boolean, // true if the assigned user haven't input their feedback
    content: String,
  },
  // mongoose options
  { timestamps: true } // add timestamps
);

const feedback = mongoose.model('Feedback', feedbackSchema);

export default feedback;