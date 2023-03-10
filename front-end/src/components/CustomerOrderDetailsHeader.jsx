import React from 'react';
import PropTypes from 'prop-types';

function CustomerOrderDetailsHeader({ orderId, seller, saleDate, status }) {
  const userData = localStorage.getItem('user');
  const ROUTE = 'customer_order_details';
  const ELEMENT = 'element-order-details-label-delivery-status';
  const STATUS_NOT_FOUND = 400;
  const STATUS_OK = 201;
  const SALE_DELIVERED = 'Entregue';

  const handleStatusChange = (newStatus) => {
    fetch(`http://localhost:3001/checkout/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(userData).token,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (response.status === STATUS_OK) {
          response.json().then((data) => {
            console.log(data);
          });
        } else if (response.status === STATUS_NOT_FOUND) {
          console.log('Error updating sale status');
        }
      })
      .catch((error) => {
        console.error('Error updating sale status', error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const isDeliveredButtonDisabled = status !== 'Em Trânsito';

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
      <div>
        Order status:
        {' '}
        <span data-testid={ `${ROUTE}__${ELEMENT}` }>{status}</span>
      </div>
      <button
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        disabled={ isDeliveredButtonDisabled }
        onClick={ () => handleStatusChange(SALE_DELIVERED) }
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
