const checkoutService = require('../services/checkoutService');
const { validateToken } = require('../services/utils/validadeJWT');

const createOrder = async (req, res) => {
  const order = req.body;

  const { statusCode, data } = await checkoutService.createOrder(order);

  return res.status(statusCode).json(data);
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { statusCode, data } = await checkoutService.updateOrder(id, status);

  return res.status(statusCode).json(data);
};

const getOrderByCustomer = async (req, res) => {
  const token = req.headers.authorization;

  const { id } = validateToken(token);

  const { statusCode, data } = await checkoutService.getOrderByCustomer(id);

  return res.status(statusCode).json(data);
};

const getOrderBySeller = async (req, res) => {
  const token = req.headers.authorization;

  const { id } = validateToken(token);

  const { statusCode, data } = await checkoutService.getOrderBySeller(id);

  return res.status(statusCode).json(data);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { id: tokenId, role } = validateToken(token);

  const { statusCode, data } = await checkoutService.getOrderById(id, tokenId, role);

  return res.status(statusCode).json(data);
};

const getOrderByIdSeller = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { id: tokenId } = validateToken(token);

  const { statusCode, data } = await checkoutService.getOrderByIdSeller(id, tokenId);

  return res.status(statusCode).json(data);
};

module.exports = {
  createOrder,
  getOrderByIdSeller,
  updateOrder,
  getOrderByCustomer,
  getOrderBySeller,
  getOrderById,
};