const { Sale, SaleProduct, User, Product } = require('../../database/models');
const NotFound = require('./utils/errors/NotFound');

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
      status: 'Pendente',
    });

  await Promise.all(products.map(async (e) => SaleProduct
    .create({ saleId: insertOrder.id, productId: e.id, quantity: e.quantity })));

    return { statusCode: 201, data: insertOrder.id };
};

// Ver se essa função será usada posteriormente
// const findOrderById = async (id) => {
//   const orderById = await Sale.findByPk(id);

//   if (!orderById) throw new NotFound('not found');

//   return { statusCode: 200, data: orderById };
// };

const updateOrder = async (id, status) => {
  const [updatedOrder] = await Sale.update({ status }, {
    where: { id },
  });

  if (!updatedOrder) throw new NotFound('not found order');

  return { statusCode: 200, data: status };
};

const getOrderByCustomer = async (id) => {
    const orderById = await Sale.findAll({ where: { userId: id } });
  
    if (!orderById) throw new NotFound('not found');
  
    return { statusCode: 200, data: orderById };
  };

const getOrderBySeller = async (id) => {
  const orderBySeller = await Sale.findAll({ where: { sellerId: id } });

  return { statusCode: 200, data: orderBySeller };
};

const getOrderById = async (id, tokenId) => {
  const orderById = await Sale.findOne({ where: { id, userId: tokenId },
    include: [{
      model: Product, 
      as: 'products',
      attributes: { exclude: ['urlImage', 'deliveryAddress', 'deliveryNumber', 'userId'] },
      through: { attributes: ['quantity'] },
    }],
   attributes: { exclude: ['deliveryAddress', 'deliveryNumber'] },
  });

  if (!orderById) throw new NotFound('not found');

  const { name: sellerName } = await User.findOne({ where: { id: orderById.sellerId } });
  const { name: userName } = await User.findOne({ where: { id: orderById.userId } });

  orderById.sellerId = sellerName;
  orderById.userId = userName;

  return { statusCode: 200, data: orderById };
};

const getOrderByIdSeller = async (id, tokenId) => {
  const orderById = await Sale.findByPk(id, {
    include: [{
      model: Product, 
      as: 'products',
      attributes: { exclude: ['urlImage', 'deliveryAddress', 'deliveryNumber', 'userId'] },
      through: { attributes: ['quantity'] },
    }],
   attributes: { exclude: ['deliveryAddress', 'deliveryNumber'] },
  });

  if (!orderById) throw new NotFound('not found');
 
  if (tokenId !== orderById.sellerId) throw new NotFound('not found');

  const { name: sellerName } = await User.findOne({ where: { id: orderById.sellerId } });
  const { name: userName } = await User.findOne({ where: { id: orderById.userId } });

  orderById.sellerId = sellerName;
  orderById.userId = userName;

  return { statusCode: 200, data: orderById };
};

module.exports = {
  createOrder,
  getOrderByIdSeller,
  updateOrder,
  getOrderByCustomer,
  getOrderBySeller,
  getOrderById,
};
