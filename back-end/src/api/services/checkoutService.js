const { Sale, SaleProduct, User } = require('../../database/models');
const NotFound = require('./utils/errors/NotFound');
// const { validateToken } = require('./utils/validadeJWT');

const createOrder = async (order) => {
  const { userName, sellerName, totalPrice, deliveryAddress, deliveryNumber, products } = order;

    const date = new Date();
    const findUser = await User.findOne({ where: { name: userName } });
    const findSeller = await User.findOne({ where: { name: sellerName } });

    const insertOrder = await Sale.create({
      userId: findUser.id,
      sellerId: findSeller.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: date,
      status: 'pending',
    });

  await Promise.all(products.map(async (e) => SaleProduct
    .create({ saleId: insertOrder.id, productId: e.id, quantity: e.quantity })));

    return { statusCode: 200, data: insertOrder };
};

const findOrderById = async (id) => {
  const orderById = await Sale.findByPk(id);

  if (!orderById) throw new NotFound('not found');

  return { statusCode: 200, data: orderById };
};

module.exports = {
  createOrder,
  findOrderById,
};
