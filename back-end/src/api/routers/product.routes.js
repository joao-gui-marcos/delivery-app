const express = require('express');
const { getAllProducts } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

module.exports = productRouter;