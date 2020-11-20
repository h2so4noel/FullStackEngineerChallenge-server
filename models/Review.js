import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    targetId: String,
    reviewerId: String,
    content: String,
    taskName: String,
    createdAt: String,
  },
  // mongoose options
  { timestamps: true } // add timestamps
);

const review = mongoose.model('Review', reviewSchema);

export default review;