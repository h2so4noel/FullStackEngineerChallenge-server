import mongoose from 'mongoose';

const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    review: { type: Schema.Types.ObjectId, ref: 'Review' }, // review this feedback was assigned to
    assignedUser: { type: Schema.Types.ObjectId, ref: 'User' }, // the user who this feedback is assigned to by admin
    pending: Boolean, // true if the assigned user haven't input their feedback
    content: String,
  },
  // mongoose options
  { timestamps: true } // add timestamps
);

const feedback = mongoose.model('Feedback', feedbackSchema);

export default feedback;