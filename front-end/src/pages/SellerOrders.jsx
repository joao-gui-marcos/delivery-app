import React, { useState, useEffect } from 'react';
import CustomerNavBar from '../components/CustomerNavBar';
import SellerOrderCard from '../components/seller/SellerOrderCard';

function SellerOrders() {
  const userData = localStorage.getItem('user');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      fetch('http://localhost:3001/checkout/seller', {
        method: 'GET',
        headers: {
          Authorization: JSON.parse(userData).token,
        },
      })
        .then((response) => response.json())
        .then((data) => setOrders(data))
        .catch((error) => console.error('Error fetching orders', error));
    };
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <div>
        {orders && orders.length !== 0 && orders.map((order) => (
          <SellerOrderCard
            key={ order.id }
            orderId={ order.id }
            status={ order.status }
            saleDate={ formatDate(order.saleDate) }
            totalPrice={ order.totalPrice }
            address={ order.deliveryAddress }
          />
        ))}
      </div>
    </div>
  );
}

export default SellerOrders;
