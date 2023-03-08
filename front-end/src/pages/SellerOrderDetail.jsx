import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerNavBar from '../components/CustomerNavBar';
import SellerOrderDetailsHeader from '../components/seller/SellerOrderDetailsHeader';
import SellerOrderDetailsTable from '../components/seller/SellerOrderDetailsTable';

function SellerOrderDetail() {
  const { id } = useParams();
  const userData = localStorage.getItem('user');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = () => {
      fetch(`http://localhost:3001/checkout/order/${id}`, {
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
  }, [userData]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <SellerOrderDetailsHeader
        orderId={ order.id }
        saleDate={ order.saleDate }
        status={ order.status }
      />
      <SellerOrderDetailsTable items={ order.products } />
      <p
        type="button"
        data-testid="seller_order_details__element-order-total-price"
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

export default SellerOrderDetail;
