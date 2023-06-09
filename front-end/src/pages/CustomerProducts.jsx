import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerNavBar from '../components/CustomerNavBar';
import ProductCard from '../components/ProductCard';
import Cart from '../entities/cart';
import '../styles/CustomerProducts.css';

function CustomerProducts() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const userData = localStorage.getItem('user');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log(JSON.parse(userData).token);
    fetch('http://localhost:3001/products', {
      method: 'GET',
      headers: {
        Authorization: JSON.parse(userData).token,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products', error));
  }, [userData]);

  useEffect(() => {
    setTotalPrice(Cart.getTotalBRLFormated());
  }, []);

  const updateCartItem = ({ id, name, price, quantity }) => {
    Cart.addItem({ id, name, price, quantity });
    setTotalPrice(Cart.getTotalBRLFormated());
  };

  const handleClick = () => {
    history.push('/customer/checkout');
  };

  return (
    <div className="products-page">
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <div className="product-container">
        {products.map((product) => (
          <ProductCard
            key={ product.id }
            name={ product.name }
            price={ product.price }
            image={ product.urlImage }
            id={ product.id }
            onUpdateCart={ (item) => updateCartItem(item) }
          />
        ))}
      </div>
      <button
        className="products-page-button"
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ handleClick }
        disabled={ totalPrice <= '0,00' }
      >
        Cart: R$
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {totalPrice}
        </span>
      </button>
    </div>
  );
}

export default CustomerProducts;
