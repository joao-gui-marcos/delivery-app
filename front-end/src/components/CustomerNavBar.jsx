import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cart from '../entities/cart';
import '../styles/NavBar.css';

function CustomerNavBar({ name }) {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('user'));
  const userRole = userData.role;
  const handleLogout = () => {
    Cart.clear();
    localStorage.removeItem('user');
    history.push('/login');
    // redirect the user to the login page or somewhere else
  };

  return (
    <nav className="nav-bar">
      <ul>
        {userRole === 'customer'
        && (
          <li className="products-link">
            <Link
              className="nav-link"
              data-testid="customer_products__element-navbar-link-products"
              to="/customer/products"
            >
              Products
            </Link>
          </li>
        )}
        {userRole !== 'administrator'
        && (
          <li className="orders-link">
            <Link
              className="nav-link"
              data-testid="customer_products__element-navbar-link-orders"
              to={ userRole === 'customer' ? '/customer/orders' : '/seller/orders' }
            >
              Orders
            </Link>
          </li>
        )}
        {userRole === 'administrator'
        && (
          <li className="users-link">
            <Link
              className="nav-link"
              data-testid="customer_products__element-navbar-link-products"
              to="/admin/manage"
            >
              User Management
            </Link>
          </li>
        )}
        <li
          className="user-name"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          Logged in as
          {' '}
          {name}
        </li>
        <li className="logout-link">
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
