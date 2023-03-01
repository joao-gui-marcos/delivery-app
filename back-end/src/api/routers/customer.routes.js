const express = require('express');
const { createOrder } = require('../controllers/customerController');
// const { verifyAutorization } = require('../middlewares/login.middlewares');

const customerRouter = express.Router();

customerRouter.post('/', createOrder);

module.exports = customerRouter;