const md5 = require('md5');
const { Op } = require('sequelize');
// const BadRequest = require('./utils/errors/BadRequest');
const NotFound = require('./utils/errors/NotFound');
const { User } = require('../../database/models');
const createToken = require('./utils/validadeJWT');
const Conflict = require('./utils/errors/Conflict');

const login = async ({ email, password }) => {
  const userInfo = await User.findOne({
    where:
      { email, password: md5(password) },
    attributes:
      { exclude: ['password'] },
  });

  // const { dataValues } = userInfo;

  // if (!userInfo) return { statusCode: 400, message: 'Invalid fields' };
  if (!userInfo) throw new NotFound('Invalid fields');

  const token = createToken(userInfo.dataValues);

  return { statusCode: 200, data: { ...userInfo.dataValues, token } };
};

const createUser = async (newUser) => {
  const verifyIfExists = await User.findOne(
    { where: { [Op.or]: [{ name: newUser.name }, { email: newUser.email }] } },
  );

  if (verifyIfExists) throw new Conflict('User already exists');

  const { dataValues: { name, email, role } } = await User.create({
    name: newUser.name, email: newUser.email, password: md5(newUser.password), role: 'costumer',
  });

  const token = createToken({ name, email, role });

  return { statusCode: 201, data: { name, email, role, token } };
};

module.exports = {
  login,
  createUser,
};