import { User } from '../models/index.js';

const userController = {};

userController.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: "Invalid body.name (can't create user without name)" });
  }

  const user = new User({
    name: req.body.name,
  });
  
  user.save({ name: req.body.name }).then(data => {
    res.send(data);
  })
}

userController.findAll = (req, res) => {
  User.find().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({ message: err.msg || "Error while retrieving all users" });
  });
}

userController.findOne = (req,res) => {
  const id = req.params.id;

  User.findById(id).then(data => {
    if (!data) {
      res.status(404).send({ message: "User not found with id: " + id });
    } else {
      res.send(data);
    }
  }).catch(err => {
    res.status(500).send({ message: err.message || "Error while retrieving User with id: "+ id });
  });
}

userController.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id).then(data => {
    if (!data) {
      res.status(404).send({ message: "User not found with id: " + id });
    } else {
      res.send({ message: "User was deleted successfully." });
    }
  }).catch(err => {
    res.status(500).send({ message: err.message || "Error while deleting User with id:" + id });
  });
};

userController.deleteAll = (req, res) => {
  User.deleteMany().then(data => {
    res.send({ message: 'Deleted all users successfully' });
  }).catch(err => {
    res.status(500).send({ message: err.message || "Error while deleting all users" });
  })
}

export default userController;