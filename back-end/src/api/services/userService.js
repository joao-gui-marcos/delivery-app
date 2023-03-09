const md5 = require('md5');
const { Op } = require('sequelize');
const NotFound = require('./utils/errors/NotFound');
const { User } = require('../../database/models');
const { createToken } = require('./utils/validadeJWT');
const Conflict = require('./utils/errors/Conflict');

const login = async ({ email, password }) => {
  const userInfo = await User.findOne({
    where: { email, password: md5(password) },
    attributes: { exclude: ['password'] },
  });

  if (!userInfo) throw new NotFound('Invalid fields');

  const token = createToken(userInfo.dataValues.id, userInfo.dataValues.name, 
    userInfo.dataValues.email, userInfo.dataValues.role);
  return { statusCode: 200, data: { ...userInfo.dataValues, token } };
};

const createUser = async (newUser) => {
  const verifyIfExists = await User.findOne({
    where: { [Op.or]: [{ name: newUser.name }, { email: newUser.email }] },
  });

  if (verifyIfExists) throw new Conflict('User already exists');

  const createdUser = await User.create({
    name: newUser.name,
    email: newUser.email,
    password: md5(newUser.password),
    role: 'customer',
  });

  const token = createToken(createdUser.id, createdUser.name, createdUser.email, createdUser.role);

  return { statusCode: 201, data: { ...createdUser.dataValues, token } };
};

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });

  return { statusCode: 200, data: sellers };
};

const createUserManagement = async ({ name, email, password, role }) => {
  const verifyIfExists = await User.findOne({
    where: { [Op.or]: [{ name }, { email }] },
  });

  if (verifyIfExists) throw new Conflict('User already exists');

  const createdUser = await User.create({
    name,
    email,
    password: md5(password),
    role,
  });

  const token = createToken(createdUser.id, createdUser.name, createdUser.email, createdUser.role);

  return { statusCode: 201, data: { ...createdUser.dataValues, token } };
};

module.exports = {
  login,
  createUser,
  getAllSellers,
  createUserManagement,
};
