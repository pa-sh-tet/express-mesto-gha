/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const Card = require('../models/card');
const {
  success_code, success_create_code, error_code, uncorrect_error, forbidden_error,
} = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(success_code).send({ data: cards }))
    .catch(next);
};

module.exports.postCards = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link })
    .then((card) => res.status(success_create_code).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        res.status(forbidden_error).send({ message: 'Вы не можете удалить эту карточку!' });
      }
      res.status(success_code).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      }
      next(err);
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(success_code).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      }
      next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndRemove(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(success_code).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(uncorrect_error).send({ message: err.message }));
      }
      next(err);
    });
};
