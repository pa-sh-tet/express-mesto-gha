const cardRouter = require('express').Router();

const { validateCard, validateCardId } = require('../middlewares/validation');

const {
  getCards,
  postCards,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCard, postCards);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, putLike);
cardRouter.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = cardRouter;
