const express = require('express');
const { createOrder,
  findOrderById,
  updateOrder,
  requestSaleInformationFromIdCustomer,
  requestSaleProductsInformation,
} = require('../controllers/checkoutController');
const { verifyAutorization } = require('../middlewares/login.middlewares');

const checkoutRouter = express.Router();

checkoutRouter.post('/', createOrder);
checkoutRouter.get('/:id', verifyAutorization, findOrderById);
checkoutRouter.put('/:id', updateOrder);
checkoutRouter.get('/', verifyAutorization, requestSaleInformationFromIdCustomer);
checkoutRouter.get('/order/:id', requestSaleProductsInformation);

module.exports = checkoutRouter;