import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({ name, price, image }) {
  const [quantity, setQuantity] = useState(0);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>
        Price: $
        {price}
      </p>
      <img src={ image } alt={ name } />
      <div>
        <button type="button" onClick={ handleDecreaseQuantity }>-</button>
        <span>{quantity}</span>
        <button type="button" onClick={ handleIncreaseQuantity }>+</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ProductCard;
