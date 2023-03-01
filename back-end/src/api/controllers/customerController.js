const CustomerService = require('../services/customerService');

const createOrder = async (req, res) => {
  const order = req.body;
  const token = req.headers.authorization;
  const { statusCode, data } = await CustomerService.createOrder(order, token);

  return res.status(statusCode).json(data);
};

module.exports = {
  createOrder,
};