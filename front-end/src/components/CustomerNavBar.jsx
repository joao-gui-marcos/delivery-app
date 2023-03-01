import React from 'react';
import { Link } from 'react-router-dom';

function CustomerNavBar() {
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
          Jose
        </li>
        <li>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default CustomerNavBar;
