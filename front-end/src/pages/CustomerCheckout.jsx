import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerCheckoutTable from '../components/CustomerCheckoutTable';
import CustomerInfo from '../components/CustomerInfo';
import CustomerNavBar from '../components/CustomerNavBar';
import Cart from '../entities/cart';
import useSale from '../hooks/useSale';
import '../styles/CustomerCheckout.css';

function CustomerCheckout() {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('user'));
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const { userName, totalPrice, deliveryAddress, deliveryNumber, products } = useSale();

  useEffect(() => {
    setTotalCartPrice(Cart.getTotalBRLFormated());
  }, []);

  const handleClick = async () => {
    const orderData = {
      userName,
      sellerName: 'Fulana Pereira',
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products,
    };
    try {
      const response = await fetch('http://localhost:3001/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userData.token,
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error('Error submitting order');
      }
      const id = Number(await response.json());
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CustomerNavBar name={ userData.name } />
      <CustomerCheckoutTable
        onRemoveItem={ () => setTotalCartPrice(Cart.getTotalBRLFormated()) }
      />
      <br />
      <br />
      <CustomerInfo />
      <div className="button-container">
        <span
          className="total-cart"
          data-testid="customer_checkout__element-order-total-price"
        >
          Total: R$
          {' '}
          {totalCartPrice}
        </span>
        <button
          className="checkout-page-total-button"
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ handleClick }
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}

export default CustomerCheckout;
