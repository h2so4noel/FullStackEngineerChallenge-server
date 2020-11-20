import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    role: String,
  },
  // mongoose options
  { timestamps: true } // add timestamps
);

const review = mongoose.model('User', userSchema);

export default review;