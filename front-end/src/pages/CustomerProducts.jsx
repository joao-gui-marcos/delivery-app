import React from 'react';
import CustomerNavBar from '../components/CustomerNavBar';
import ProductCard from '../components/ProductCard';

function CustomerProducts() {
  return (
    <div>
      <CustomerNavBar />
      Customer Products
      <ProductCard />
    </div>
  );
}

export default CustomerProducts;
