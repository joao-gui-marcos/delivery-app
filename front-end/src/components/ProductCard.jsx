import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({ name, price, image, id, onUpdateCart }) {
  const [quantity, setQuantity] = useState(
    JSON.parse(localStorage.getItem('cart'))?.find((item) => item
      .id === id)?.quantity || 0,
  );

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    onUpdateCart({ id, name, price, quantity: quantity + 1 });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onUpdateCart({ id, name, price, quantity: quantity - 1 });
    }
  };

  const handleQuantityChange = ({ target: { value } }) => {
    const newQuantity = parseInt(value, 10);
    setQuantity(newQuantity);
    onUpdateCart({ id, name, price, quantity: newQuantity });
  };

  return (
    <div>
      <h2 data-testid={ `customer_products__element-card-title-${id}` }>{name}</h2>
      <p>
        Price: $
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {price.replace('.', ',')}
        </span>
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ image }
        alt={ name }
        height="100px"
      />
      <div>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ handleDecreaseQuantity }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          value={ quantity }
          onChange={ handleQuantityChange }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ handleIncreaseQuantity }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onUpdateCart: PropTypes.func.isRequired,
};

export default ProductCard;
