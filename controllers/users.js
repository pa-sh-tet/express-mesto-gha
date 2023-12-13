/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  success_code, success_create_code, error_code, uncorrect_error, not_found_error,
} = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(success_code).send({ data: users }))
    .catch(next);
};

module.exports.postUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(success_create_code).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      } else {
        next(err);
      }
    });
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.status(success_code).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      }
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(not_found_error).send('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    {
      name: name,
      about: about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(success_code).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      } else if (err.name === 'ValidationError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      } else {
        next(err);
      }
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { avatar: avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(success_code).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      } else if (err.name === 'ValidationError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 360000, sameSite: true });
      res.send({ token });
    })
    .catch(next);
};
