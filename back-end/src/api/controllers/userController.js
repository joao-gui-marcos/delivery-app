const UserService = require('../services/userService');
const { validateToken } = require('../services/utils/validadeJWT');

const login = async (req, res) => {
  const { statusCode, data, message } = await UserService.login(req.body);

  if (message) return res.status(statusCode).json(message);

  return res.status(statusCode).json(data);
};

const createUser = async (req, res) => {
  const { statusCode, data, message } = await UserService.createUser(req.body);

  if (message) return res.status(statusCode).json(message);

  return res.status(statusCode).json(data);
};

const findSeller = async (req, res) => {
  const { authorization } = req.headers;

  const { role } = validateToken(authorization);
  if (role !== 'seller') { return res.status(401).json({ message: 'Seller not Found' }); }
  const { statusCode, data } = await UserService.findSeller(role);

  return res.status(statusCode).json(data);
};

module.exports = {
  login,
  createUser,
  findSeller,
};
