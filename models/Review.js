import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    revieweeUser: { type: Schema.Types.ObjectId, ref: 'User' }, // the user who this review is for
    taskName: String, // task name of this performance review
    content: String, // content of the review
    feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  },
  // mongoose options
  { timestamps: true } // add timestamps
);

const review = mongoose.model('Review', reviewSchema);

export default review;