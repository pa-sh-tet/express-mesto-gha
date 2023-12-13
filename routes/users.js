const userRouter = require('express').Router();

const {
  getUsers,
  getUserId,
  getUserInfo,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', getUserId);
userRouter.patch('/me', patchUserInfo);
userRouter.patch('/me/avatar', patchUserAvatar);

module.exports = userRouter;
