/* eslint-disable no-console */
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/NotFound');

const { validateLogin, validatePostUser } = require('./middlewares/validation');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const { login, postUser } = require('./controllers/users');

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', validateLogin, login);
app.post('/signup', validatePostUser, postUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
