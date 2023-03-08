import React from 'react';
import PropTypes from 'prop-types';

function CustomerOrderDetailsHeader({ orderId, seller, saleDate, status }) {
  const ROUTE = 'customer_order_details';
  const ELEMENT = 'element-order-details-label-delivery-status';
  const handleStatusChange = () => {
    // onStatusChange('delivered');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div data-testid="customer_order_details__element-order-details-label-order-id">
        Order id:
        {' '}
        {orderId}
      </div>
      <div data-testid="customer_order_details__element-order-details-label-seller-name">
        Order seller:
        {' '}
        {seller}
      </div>
      <div data-testid="customer_order_details__element-order-details-label-order-date">
        Order date:
        {' '}
        {formatDate(saleDate)}
      </div>
      <div
        data-testid={ `${ROUTE}__${ELEMENT}` }
      >
        Order status:
        {' '}
        {status}
      </div>
      <button
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        disabled
        onClick={ handleStatusChange }
      >
        Mark as delivered

      </button>
    </div>
  );
}

CustomerOrderDetailsHeader.propTypes = {
  orderId: PropTypes.number.isRequired,
  seller: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default CustomerOrderDetailsHeader;
