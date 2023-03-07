import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function OrderCard(props) {
  const { orderId, status, date, totalPrice } = props;
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
        {date}
      </p>
      <p data-testid={ `customer_orders__element-card-price-${orderId}` }>
        Total Price:
        {' '}
        {totalPrice}
      </p>
    </button>
  );
}

OrderCard.propTypes = {
  orderId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  totalPrice: PropTypes.number.isRequired,

};

export default OrderCard;
