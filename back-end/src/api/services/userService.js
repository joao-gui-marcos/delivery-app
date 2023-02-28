const { User } = require('../../database/models');
const createToken = require('../services/utils/validadeJWT');
const md5 = require('md5');

const login = async ({email, password}) => {
  const userInfo = await User.findOne({ where: { email, password: md5(password) } }, {  attributes: { exclude: ['password'] } });

  if (!userInfo) return {statusCode: 400, message: 'Invalid fields'};
  const {password: _, ...obj} = userInfo.dataValues;

  const token = createToken(obj);

  return { statusCode: 200, data: {...obj, token} };
};

module.exports = {
  login,
};