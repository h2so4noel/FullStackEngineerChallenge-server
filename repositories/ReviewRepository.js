import Review from '../models/Review.js';

class ReviewRepository {

  constructor(model) {
    this.model = model;
  }

  create(taskName, content) {
    const newReview = { taskName, content };
    const review = new this.model(newReview);
    return review.save();
  }
  
  findAll() {
    return this.model.find();
  }

  findById(id) {
    return this.model.findById(id);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(
      query,
      { 
        $set: { 
          name: object.taskName, 
          done: object.content,
        } 
      }
    );
  }
}

export default new ReviewRepository(Review);