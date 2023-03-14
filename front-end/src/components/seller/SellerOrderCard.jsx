import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function SellerOrderCard(props) {
  const { orderId, status, saleDate, totalPrice, address } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/seller/orders/${orderId}`);
  };

  const getOrderCardClass = (classStatus) => {
    if (classStatus === 'Pendente') {
      return 'order-card pending';
    } if (classStatus === 'Preparando') {
      return 'order-card processing';
    } if (classStatus === 'Em Trânsito') {
      return 'order-card dispatch';
    }
    return 'order-card completed';
  };

  return (
    <button className="order-card" type="button" onClick={ handleClick }>
      <h2 data-testid={ `seller_orders__element-order-id-${orderId}` }>
        Order ID:
        {' '}
        {orderId}
      </h2>
      <h3>Details:</h3>
      <p
        className={ getOrderCardClass(status) }
        data-testid={ `seller_orders__element-delivery-status-${orderId}` }
      >
        Status:
        {' '}
        {status}
      </p>
      <p data-testid={ `seller_orders__element-order-date-${orderId}` }>
        Date:
        {' '}
        {saleDate}
      </p>
      <p data-testid={ `seller_orders__element-card-price-${orderId}` }>
        Total Price:
        {' '}
        <span>
          {Number(totalPrice)
            .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </p>
      <p data-testid={ `seller_orders__element-card-address-${orderId}` }>
        Delivery Address:
        {' '}
        {address}
      </p>
    </button>
  );
}

SellerOrderCard.propTypes = {
  orderId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,

};

export default SellerOrderCard;
