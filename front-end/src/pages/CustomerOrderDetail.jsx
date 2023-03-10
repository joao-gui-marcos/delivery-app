import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerNavBar from '../components/CustomerNavBar';
import CustomerOrderDetailsHeader from '../components/CustomerOrderDetailsHeader';
import CustomerOrderDetailsTable from '../components/CustomerOrderDetailsTable';

function CustomerOrderDetail() {
  const { id } = useParams();
  const userData = localStorage.getItem('user');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = () => {
      fetch(`http://localhost:3001/checkout/order/${id}/user`, {
        method: 'GET',
        headers: {
          Authorization: JSON.parse(userData).token,
        },
      })
        .then((response) => response.json())
        .then((data) => setOrder(data))
        .catch((error) => console.error('Error fetching orders', error));
    };
    fetchOrders();
  }, [order]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <CustomerOrderDetailsHeader
        orderId={ order.id }
        seller={ order.sellerId }
        saleDate={ order.saleDate }
        status={ order.status }
      />
      <CustomerOrderDetailsTable items={ order.products } />
      <p
        type="button"
        data-testid="customer_order_details__element-order-total-price"
      >
        Total Price: R$
        {' '}
        <span>
          {Number(order.totalPrice)
            .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </p>
    </div>
  );
}

export default CustomerOrderDetail;
