import React, { useState, useEffect } from 'react';
import CustomerNavBar from '../components/CustomerNavBar';
import ProductCard from '../components/ProductCard';

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const userData = localStorage.getItem('user');

  useEffect(() => {
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

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      Customer Products
      {products.map((product) => (
        <ProductCard
          key={ product.id }
          name={ product.name }
          price={ product.price }
          image={ product.urlImage }
        />
      ))}
    </div>
  );
}

export default CustomerProducts;
