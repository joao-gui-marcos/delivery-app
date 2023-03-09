import React from 'react';
import PropTypes from 'prop-types';

function AdmUsersTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, ind) => (
          <tr key={ user.id }>
            <td
              data-testid={ `seller_order_details__element-order-table-item-number-
              ${ind}` }
            >
              {ind + 1}
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-name-${ind}` }
            >
              {user.name}
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-quantity-
              ${ind}` }
            >
              {user.email}
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-quantity-
              ${ind}` }
            >
              {user.role}
            </td>
            <td
              data-testid={ `seller_order_details__element-order-table-quantity-
              ${ind}` }
            >
              <button type="button">Delete</button>
            </td>
            <td />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const userPropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

AdmUsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(userPropTypes)).isRequired,
};

export default AdmUsersTable;
