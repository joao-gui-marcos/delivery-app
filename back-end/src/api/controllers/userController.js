const UserService = require('../services/userService');

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

module.exports = {
  login,
  createUser,
};