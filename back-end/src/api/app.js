require('express-async-errors');
const express = require('express');
const loginRouter = require('./routers/login.routes');
const registerRouter = require('./routers/register.routes');
const errorHandler = require('./middlewares/ErrorHandler');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use(errorHandler);

module.exports = app;
