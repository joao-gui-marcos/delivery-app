const ProductService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const { statusCode, data } = await ProductService.getAllProducts();

  return res.status(statusCode).json(data);
};

module.exports = {
  getAllProducts,
};