/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const Card = require('../models/card');
const {
  success_code, success_create_code, error_code, uncorrect_error,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(success_code).send({ data: cards }))
    .catch((err) => res.status(error_code).send({ message: err.message }));
};

module.exports.postCards = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.status(success_create_code).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(uncorrect_error).send({ message: err.message });
      } else {
        res.status(error_code).send({ message: err.message });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => res.status(success_code).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(uncorrect_error).send({ message: err.message });
      }
      res.status(error_code).send({ message: err.message });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(success_code).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(uncorrect_error).send({ message: err.message });
      }
      res.status(error_code).send({ message: err.message });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndRemove(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(success_code).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(uncorrect_error).send({ message: err.message });
      }
      res.status(error_code).send({ message: err.message });
    });
};
