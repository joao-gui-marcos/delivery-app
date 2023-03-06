const { Sale, SaleProduct, User, Product } = require('../../database/models');
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

    return { statusCode: 200, data: insertOrder.id };
};

const findOrderById = async (id) => {
  const orderById = await Sale.findByPk(id);

  if (!orderById) throw new NotFound('not found');

  return { statusCode: 200, data: orderById };
};

const updateOrder = async (id, status) => {
  const [updatedOrder] = await Sale.update({ status }, {
    where: { id },
  });

  if (!updatedOrder) throw new NotFound('not found order');

  return { statusCode: 200, data: status };
};

const requestSaleInformationFromIdCustomer = async (id) => {
  const [orderById] = await Sale.findAll({ where: { userId: id } });

  if (!orderById) throw new NotFound('not found');

  return { statusCode: 200, data: orderById };
};

const requestSaleProductsInformation = async (id) => {
  const orderById = await Sale.findByPk(id, {
include: [{
    model: Product, 
  as: 'products',
  attributes: { exclude: ['urlImage', 'deliveryAddress', 'deliveryNumber', 'userId'] },
  through: {
      attributes: ['quantity'],
    },
  }],
 });

 if (!orderById) throw new NotFound('not found');
  return { statusCode: 200, data: orderById };
};

module.exports = {
  createOrder,
  findOrderById,
  updateOrder,
  requestSaleInformationFromIdCustomer,
  requestSaleProductsInformation,
};
