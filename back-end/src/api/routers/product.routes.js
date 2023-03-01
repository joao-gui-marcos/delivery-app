const express = require('express');
const { getAllProducts } = require('../controllers/productController');
const { verifyAutorization } = require('../middlewares/login.middlewares');

const productRouter = express.Router();

productRouter.get('/', verifyAutorization, getAllProducts);

module.exports = productRouter;