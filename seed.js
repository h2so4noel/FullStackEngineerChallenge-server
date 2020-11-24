import _ from 'lodash';
import faker from 'faker';
import mongoose from 'mongoose';
import config from './config/config.js';

import { User, Review, Feedback } from './models/index.js'

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seeding users
let users = [];
for (let i = 0; i < 20; i++) {
  const user = {
    _id: new mongoose.Types.ObjectId(),
    name: faker.name.firstName(),
  }
  users.push(user);
}

await User.insertMany(users).then((res) => {
  console.log('Finished seeding users');
  users = res; // Update sample users list to use with seeding reviews
}).catch(() => {
  console.log('Something went wrong when seeding Users');
});

// Seeding reviews
let reviews = [];
for (let i = 0; i < 100; i++) {
  const review = {
    _id: new mongoose.Types.ObjectId(),
    content: faker.lorem.words(50),
    taskName: `Task #${i} Performance Review`,
    revieweeUser: _.sample(users)._id,
  }
  reviews.push(review);

  // Push created Reviews to their reviewees
  User.findOneAndUpdate(
    { '_id' : review.revieweeUser }, 
    { $push: { reviews: review._id } },
    {upsert: true}, 
    (err) => {
      if (err) return console.log(err + review._id);
    }
  );
}

await Review.insertMany(reviews).then((res) => {
  console.log('Finished seeding reviews');
}).catch(() => {
  console.log('Something went wrong when seeding Reviews');
});

// Seeding feedbacks
let feedbacks = [];
for (let i = 0; i < 100; i++) {
  const feedback = {
    _id: new mongoose.Types.ObjectId(),
    review: _.sample(reviews)._id,
    assignedUser: _.sample(users)._id,
    pending: _.sample([ true, false ]), // either true or false
    content: faker.lorem.words(25),
  }
  feedbacks.push(feedback);

  // Push created feedbacks to their users
  User.findOneAndUpdate(
    { '_id' : feedback.assignedUser }, 
    { $push: { assignedFeedbacks: feedback._id } },
    { upsert: true }, 
    (err) => {
      if (err) return console.log(err + feedback._id);
    }
  );

  Review.findOneAndUpdate(
    { '_id' : feedback.review }, 
    { $push: { feedbacks: feedback._id } },
    { upsert: true }, 
    (err) => {
      if (err) return console.log(err + feedback._id);
    }
  );
}

await Feedback.insertMany(feedbacks).then((res) => {
  console.log('Finished seeding feedbacks');
}).catch(() => {
  console.log('Something went wrong when seeding Feedbacks');
});

mongoose.connection.close();