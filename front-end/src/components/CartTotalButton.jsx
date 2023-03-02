import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CartTotalButton({ cart }) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/customer/checkout');
  };

  const totalPrice = cart.reduce((total, item) => total
  + (item.quantity * parseFloat(item.price.replace(',', '.'))), 0).toFixed(2);

  return (
    <button type="button" onClick={ handleClick }>
      Total: $
      {totalPrice.replace('.', ',')}
    </button>
  );
}

CartTotalButton.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CartTotalButton;
