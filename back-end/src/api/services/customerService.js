const { Sale } = require('../../database/models');
const { validateToken } = require('./utils/validadeJWT');

const createOrder = async (order, token) => {
  const { name } = order;
  const verifyRole = validateToken(token);
  console.log(verifyRole);
  const insertOrder = await Sale.create({ name });

  return { statusCode: 200, data: insertOrder };
};

module.exports = {
  createOrder,
};