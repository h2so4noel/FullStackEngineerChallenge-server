export default {
  DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017/reviews',
  APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 80,
};