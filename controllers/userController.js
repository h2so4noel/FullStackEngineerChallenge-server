import { User } from '../models/index.js';

const userController = {};

userController.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({ 
      message: "Invalid body.name (can't create user without name)" 
    });
  }

  User.save({ name: req.body.name }).then(data => {
    res.send(data);
  })
}

userController.findAll = (req, res) => {
  User.find().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.msg || "Error while retrieving all users"
    });
  });
}

userController.findOne = (req,res) => {
  const id = req.params.id;

  User.findById(id).then(data => {
    if (!data) {
      res.status(404).send({
        message: "User not found with id: " + id
      });
    } else res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error while retrieving User with id: "+ id
    });
  });
}