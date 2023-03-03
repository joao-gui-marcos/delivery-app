import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function CustomerNavBar({ name }) {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
    // redirect the user to the login page or somewhere else
  };

  return (
    <nav>
      <ul>
        <li>
          <Link
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/orders"
          >
            Orders
          </Link>
        </li>
        <li data-testid="customer_products__element-navbar-user-full-name">
          Logged in as
          {' '}
          {name}
        </li>
        <li>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ handleLogout }
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

CustomerNavBar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CustomerNavBar;