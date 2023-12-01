/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
const User = require('../models/user');
const { success_create_code, error_code, uncorrect_error } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(success_create_code).send({ data: users }))
    .catch((err) => res.status(error_code).send({ message: err.message }));
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(success_create_code).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(uncorrect_error).send({ message: err.message });
      } else {
        res.status(error_code).send({ message: err.message });
      }
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.status(success_create_code).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(uncorrect_error).send({ message: err.message });
      }
      res.status(error_code).send({ message: err.message });
    });
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      about: about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(success_create_code).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(uncorrect_error).send({ message: err.message });
      } else if (err.name === 'ValidationError') {
        res.status(uncorrect_error).send({ message: err.message });
      } else {
        res.status(error_code).send({ message: err.message });
      }
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { avatar: avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(success_create_code).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(uncorrect_error).send({ message: err.message });
      } else if (err.name === 'ValidationError') {
        res.status(uncorrect_error).send({ message: err.message });
      } else {
        res.status(error_code).send({ message: err.message });
      }
    });
};
