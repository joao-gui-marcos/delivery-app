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

const getAllSellers = async (_req, res) => {
  const { statusCode, data } = await UserService.getAllSellers();

  return res.status(statusCode).json(data);
};

const getAllUsers = async (_req, res) => {
  const { statusCode, data } = await UserService.getAllUsers();

  return res.status(statusCode).json(data);
};

const createUserByManagement = async (req, res) => {
  const token = req.headers.authorization;

  const { role } = validateToken(token);

  if (role !== 'administrator') {
    return res.status(403).json({ message: 'Only admins can create users' });
  }

  const { statusCode, data, message } = await UserService.createUserManagement(req.body);

  if (message) return res.status(statusCode).json(message);

  return res.status(statusCode).json(data);
};

const deleteUser = async (req, res) => {
  const token = req.headers.authorization;

  const { role } = validateToken(token);

  if (role !== 'administrator') {
    return res.status(403).json({ message: 'Only admins can create users' });
  }

  const { email } = req.body;
  const { statusCode, data, message } = await UserService.deleteUser(email);

  if (message) return res.status(statusCode).json(message);

  return res.status(statusCode).json(data);
};

module.exports = {
  login,
  createUser,
  getAllSellers,
  getAllUsers,
  createUserByManagement,
  deleteUser,
};
