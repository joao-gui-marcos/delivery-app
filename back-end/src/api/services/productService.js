const { Product } = require('../../database/models');

const getAllProducts = async () => {
  const allProducts = await Product.findAll({});

  return { statusCode: 200, data: allProducts };
};

module.exports = {
  getAllProducts,
};