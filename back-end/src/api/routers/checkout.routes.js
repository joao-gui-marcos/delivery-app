const express = require('express');
const { createOrder,
  /* findOrderById */
  updateOrder,
  getOrderByCustomer,
  getOrderBySeller,
  getOrderById,
  getOrderByIdSeller,
} = require('../controllers/checkoutController');
const { verifyAutorization } = require('../middlewares/login.middlewares');

const checkoutRouter = express.Router();

checkoutRouter.get('/seller', verifyAutorization, getOrderBySeller);
checkoutRouter.get('/customer', verifyAutorization, getOrderByCustomer);
// checkoutRouter.get('/:id', verifyAutorization, findOrderById);
checkoutRouter.patch('/:id', updateOrder);
checkoutRouter.get('/order/:id/user', getOrderById);
checkoutRouter.get('/order/:id/seller', getOrderByIdSeller);
checkoutRouter.post('/', createOrder);

module.exports = checkoutRouter;