import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cart from '../entities/cart';

function CustomerCheckoutTable({ onRemoveItem }) {
  const [items, setItems] = useState(Cart.getItems());

  const handleRemoveItem = (id) => {
    Cart.removeItem(id);
    setItems(Cart.getItems());
    onRemoveItem();
  };

  return (
    <table>
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
          <tr key={ item.id }>
            <td
              data-testid={ `customer_checkout__element-order-table-item-number-${ind}` }
            >
              {ind + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${ind}` }
            >
              {item.name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${ind}` }
            >
              {item.quantity}
            </td>
            <td>
              R$
              <span
                data-testid={ `customer_checkout__element-order-table-unit-price-${ind}` }
              >
                { Number(item.price)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${ind}` }
            >
              R$
              { Number(item.quantity * item.price)
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </td>
            <td>
              <button
                data-testid={ `customer_checkout__element-order-table-remove-${ind}` }
                type="button"
                onClick={ () => handleRemoveItem(item.id) }
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CustomerCheckoutTable.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
};

export default CustomerCheckoutTable;
