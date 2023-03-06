import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerCheckoutTable from '../components/CustomerCheckoutTable';
import CustomerInfo from '../components/CustomerInfo';
import CustomerNavBar from '../components/CustomerNavBar';
import Cart from '../entities/cart';
import useSale from '../entities/useSale';

function CustomerCheckout() {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('user'));
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const orderData = useSale();

  useEffect(() => {
    setTotalCartPrice(Cart.getTotal());
  }, []);

  const handleClick = async () => {
    // console.log(orderData);
    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          Authorization: userData.token,
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error('Error submitting order');
      }
      const { id } = await response.json();
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CustomerNavBar name={ userData.name } />
      <CustomerCheckoutTable onRemoveItem={ () => setTotalCartPrice(Cart.getTotal()) } />
      <CustomerInfo />
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        Total: R$
        {' '}
        {totalCartPrice}
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
