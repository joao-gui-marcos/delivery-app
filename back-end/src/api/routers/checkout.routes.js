const express = require('express');
const { createOrder, findOrderById } = require('../controllers/checkoutController');
const { verifyAutorization } = require('../middlewares/login.middlewares');

const checkoutRouter = express.Router();

checkoutRouter.post('/', createOrder);
checkoutRouter.get('/:id', verifyAutorization, findOrderById);

module.exports = checkoutRouter;