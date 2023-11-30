const userRouter = require('express').Router();

const {
  getUsers,
  postUser,
  getUserId,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.post('/', postUser);
userRouter.get('/:userId', getUserId);
userRouter.patch('/me', patchUserInfo);
userRouter.patch('/me/avatar', patchUserAvatar);

module.exports = userRouter;
