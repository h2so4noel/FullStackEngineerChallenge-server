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
    name: faker.name.firstName(),
  }
  users.push(user);
}

await User.insertMany(users).then((res) => {
  console.log('Finished seeding users');
}).catch(() => {
  console.log('Something went wrong when seeding Users');
});

// Seeding reviews
let reviews = [];
for (let i = 0; i < 100; i++) {
  const review = {
    content: faker.lorem.words(15),
    taskName: faker.lorem.words(1),
    revieweeUserId: _.sample(users).id,
    reviewerUserId: _.sample(users).id,
  }
  reviews.push(review);
}

await Review.insertMany(reviews).then((res) => {
  console.log('Finished seeding reviews');
}).catch(() => {
  console.log('Something went wrong when seeding Reviews');
});

mongoose.connection.close();