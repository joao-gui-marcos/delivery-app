import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerNavBar from '../components/CustomerNavBar';
import ProductCard from '../components/ProductCard';
// import CartTotalButton from '../components/CartTotalButton';

function CustomerProducts() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const userData = localStorage.getItem('user');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [cartVersion, setCartVersion] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const INDEX = -1;

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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // setTotalPrice(
    //   cart.reduce((total, item) => total
    //   + (item.quantity * parseFloat(item.price.replace('.', ','))), 0)
    //     .toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
    // );
    const tot = cart.reduce((total, item) => total
     + (item.quantity * parseFloat(item.price)), 0).toFixed(2);

    const formattedTotal = Number(tot)
      .toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    setTotalPrice(formattedTotal);
  }, [cart]);

  const updateCartItem = (productId, { id, name, price, quantity }) => {
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex === INDEX) {
      setCart([...cart, { id, name, price, quantity }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity = quantity;
      setCart(updatedCart);
    }
    setCartVersion(cartVersion + 1);
  };

  const handleClick = () => {
    history.push('/customer/checkout');
  };

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      {products.map((product) => (
        <ProductCard
          key={ product.id }
          name={ product.name }
          price={ product.price }
          image={ product.urlImage }
          id={ product.id }
          onUpdateCart={ (quantity) => updateCartItem(product.id, quantity) }
        />
      ))}
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ handleClick }
        disabled={ totalPrice <= '0,00' }
      >
        Total: $
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {totalPrice}
        </span>
      </button>
    </div>
  );
}

export default CustomerProducts;
