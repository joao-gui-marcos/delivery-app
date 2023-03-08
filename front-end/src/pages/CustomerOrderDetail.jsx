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
    async function fetchOrder() {
      try {
        const response = await fetch(`http://localhost:3001/checkout/order/${id}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <CustomerOrderDetailsHeader
        orderId={ order.id }
        // seller={ order.sellerId }
        seller="Fulana Pereira"
        saleDate={ order.saleDate }
        status={ order.status }
      />
      <CustomerOrderDetailsTable items={ order.products } />
      <button
        type="button"
        data-testid="customer_order_details__element-order-total-price"
      >
        Total Price: R$
        {' '}
        <span>
          {Number(order.totalPrice)
            .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </button>
    </div>
  );
}

export default CustomerOrderDetail;
