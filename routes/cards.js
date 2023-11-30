const cardRouter = require('express').Router();

const {
  getCards,
  postCards,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', postCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', putLike);
cardRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardRouter;
