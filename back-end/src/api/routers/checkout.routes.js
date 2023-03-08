const express = require('express');
const { createOrder,
  /* findOrderById */
  updateOrder,
  getOrderByCustomer,
  getOrderBySeller,
  getOrderById,
} = require('../controllers/checkoutController');
const { verifyAutorization } = require('../middlewares/login.middlewares');

const checkoutRouter = express.Router();

checkoutRouter.get('/seller', verifyAutorization, getOrderBySeller);
checkoutRouter.get('/customer', verifyAutorization, getOrderByCustomer);
checkoutRouter.post('/', createOrder);
// checkoutRouter.get('/:id', verifyAutorization, findOrderById);
checkoutRouter.put('/:id', updateOrder);
checkoutRouter.get('/order/:id', verifyAutorization, getOrderById);

module.exports = checkoutRouter;