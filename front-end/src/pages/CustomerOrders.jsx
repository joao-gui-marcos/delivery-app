import React, { useState, useEffect } from 'react';
import CustomerNavBar from '../components/CustomerNavBar';
import OrderCard from '../components/OrderCard';
import fetchOrders from '../services/api';

function CustomerOrders() {
  const userData = localStorage.getItem('user');
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const fetchOrdersData = async () => {
  //     const data = await fetchOrders();
  //     setOrders(data);
  //   };

  //   fetchOrdersData();
  // }, []);

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <div>
        {orders.map((order) => (
          <OrderCard
            key={ order.id }
            orderId={ order.id }
            orderStatus={ order.status }
            orderDate={ order.date }
            orderTotalPrice={ order.totalPrice }
          />
        ))}
      </div>
      <OrderCard
        orderId="1"
        status="Pendente"
        date="2022-02-28"
        totalPrice="100.00"
      />

    </div>
  );
}

export default CustomerOrders;
