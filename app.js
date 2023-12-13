/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const { login, postUser } = require('./controllers/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(auth);
app.use(errorHandler);

app.post('/signin', login);
app.post('/signup', postUser);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
