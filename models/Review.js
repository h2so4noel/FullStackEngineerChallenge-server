import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  // targetId: {
  //   type: String,
  // },
  // reviewerId: {
  //   type: String,
  // },
  content: {
    type: String,
  },
  taskName: {
    type: String,
  },
  // createdAt: {
  //   type: String,
  // },
});

const review = mongoose.model('Review', reviewSchema);

export default review;