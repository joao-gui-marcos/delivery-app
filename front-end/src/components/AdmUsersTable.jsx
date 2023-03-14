import React from 'react';
import PropTypes from 'prop-types';

function AdmUsersTable({ users }) {
  const userData = JSON.parse(localStorage.getItem('user'));

  const handleDelete = async (email) => {
    try {
      const response = await fetch('http://localhost:3001/user/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userData.token,
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Error deleting user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="admin-table">
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
              data-testid={ `admin_manage__element-user-table-item-number-
              ${ind}` }
            >
              {ind + 1}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${ind}` }
            >
              {user.name}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-
              ${ind}` }
            >
              {user.email}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-
              ${ind}` }
            >
              {user.role}
            </td>
            <td>
              <button
                type="button"
                onClick={ () => handleDelete(user.email) }
                data-testid={ `admin_manage__element-user-table-remove-${ind}` }
              >
                Delete
              </button>
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
