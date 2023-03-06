const checkoutService = require('../services/checkoutService');
const { validateToken } = require('../services/utils/validadeJWT');

const createOrder = async (req, res) => {
  const order = req.body;

  const { statusCode, data } = await checkoutService.createOrder(order);

  return res.status(statusCode).json(data);
};

const findOrderById = async (req, res) => {
  const { id } = req.params;

  const { statusCode, data } = await checkoutService.findOrderById(id);

  return res.status(statusCode).json(data);
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { statusCode, data } = await checkoutService.updateOrder(id, status);

  return res.status(statusCode).json(data);
};

const requestSaleInformationFromIdCustomer = async (req, res) => {
  const token = req.headers.authorization;

  const { id } = validateToken(token);

  const { statusCode, data } = await checkoutService.requestSaleInformationFromIdCustomer(id);

  return res.status(statusCode).json(data);
};

module.exports = {
  createOrder,
  findOrderById,
  updateOrder,
  requestSaleInformationFromIdCustomer,
};