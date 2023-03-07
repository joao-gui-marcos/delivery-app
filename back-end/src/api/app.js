require('express-async-errors');
const express = require('express');
const cors = require('cors');
const loginRouter = require('./routers/login.routes');
const userRouter = require('./routers/user.routes');
const productRouter = require('./routers/product.routes');
const checkoutRouter = require('./routers/checkout.routes');
const errorHandler = require('./middlewares/ErrorHandler');

const app = express();

app.use(express.json());
app.use('/images', express.static('images'));
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use(errorHandler);

module.exports = app;
