import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    targetId: String, // the user who this review is for
    reviewerId: String, // usually admin's id
    content: String,
    taskName: String, // task name of this performance review
  },
  // mongoose options
  { timestamps: true } // add timestamps
);

const review = mongoose.model('Review', reviewSchema);

export default review;