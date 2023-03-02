const CustomerService = require('../services/checkoutService');

const createOrder = async (req, res) => {
  const order = req.body;

  const { statusCode, data } = await CustomerService.createOrder(order);

  return res.status(statusCode).json(data);
};

const findOrderById = async (req, res) => {
  const { id } = req.params;

  const { statusCode, data } = await CustomerService.findOrderById(id);

  return res.status(statusCode).json(data);
};

module.exports = {
  createOrder,
  findOrderById,
};