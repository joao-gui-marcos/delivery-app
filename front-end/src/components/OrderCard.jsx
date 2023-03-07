import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function OrderCard(props) {
  const { orderId, status, saleDate, totalPrice } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/customer/orders/${orderId}`);
  };

  return (
    <button type="button" onClick={ handleClick }>
      <h2>Order Details</h2>
      <p data-testid={ `customer_orders__element-order-id-${orderId}` }>
        Order ID:
        {' '}
        {orderId}
      </p>
      <p data-testid={ `customer_orders__element-delivery-status-${orderId}` }>
        Status:
        {' '}
        {status}
      </p>
      <p data-testid={ `customer_orders__element-order-date-${orderId}` }>
        Date:
        {' '}
        {saleDate}
      </p>
      <p data-testid={ `customer_orders__element-card-price-${orderId}` }>
        Total Price:
        {' '}
        <span>
          {Number(totalPrice)
            .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </p>
    </button>
  );
}

OrderCard.propTypes = {
  orderId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,

};

export default OrderCard;
