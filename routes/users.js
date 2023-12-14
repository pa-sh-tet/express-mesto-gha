const userRouter = require('express').Router();

const { validateUserId, validateUserInfo, validateUserAvatar } = require('../middlewares/validation');

const {
  getUsers,
  getUserId,
  getUserInfo,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', validateUserId, getUserId);
userRouter.patch('/me', validateUserInfo, patchUserInfo);
userRouter.patch('/me/avatar', validateUserAvatar, patchUserAvatar);

module.exports = userRouter;
