import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    isAdmin: Boolean, // false means an employee
  },
  // mongoose options
  { timestamps: true } // add timestamps
);

const user = mongoose.model('User', userSchema);

export default user;