import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerCheckoutTable from '../components/CustomerCheckoutTable';
import CustomerInfo from '../components/CustomerInfo';
import CustomerNavBar from '../components/CustomerNavBar';
import Cart from '../entities/cart';

function CustomerCheckout() {
  const history = useHistory();
  const userData = localStorage.getItem('user');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(Cart.getTotal());
  }, []);

  const handleClick = () => {
    history.push('/customer/orders');
  };

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <CustomerCheckoutTable onRemoveItem={ () => setTotalPrice(Cart.getTotal()) } />
      <CustomerInfo />
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        Total: R$
        {' '}
        {totalPrice}
      </span>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ handleClick }
      >
        Submit Order
      </button>
    </div>
  );
}

export default CustomerCheckout;
