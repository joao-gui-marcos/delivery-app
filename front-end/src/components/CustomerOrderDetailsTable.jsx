import React from 'react';
import PropTypes from 'prop-types';
import '../styles/customerOrderDetailsTable.css';

function CustomerOrderDetailsTable({ items }) {
  return (
    <table className="customer-orderDetails-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Sub-Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, ind) => (
          <tr
            key={ item.id }
          >
            <td
              data-testid={ `customer_order_details__element-order-table-item-number-
              ${ind}` }
            >
              {ind + 1}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-name-${ind}` }
            >
              {item.name}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-quantity-
              ${ind}` }
            >
              {item.SaleProduct.quantity}
            </td>
            <td>
              R$
              <span
                data-testid={ `customer_order_details__element-order-table-unit-price-
                ${ind}` }
              >
                { Number(item.price)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-sub-total-
              ${ind}` }
            >
              R$
              { Number(item.SaleProduct.quantity * item.price)
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </td>
            <td />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const itemPropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  SaleProduct: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

CustomerOrderDetailsTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemPropTypes)).isRequired,
};

export default CustomerOrderDetailsTable;
