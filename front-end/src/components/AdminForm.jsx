import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AdminForm() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Seller');
  const [registerError, setregisterError] = useState(false);
  const PASSWORD_LENGTH = 6;
  const NAME_LENGTH = 12;
  const URL = 'http://localhost:3001/login';
  const STATUS_NOT_FOUND = 404;
  const STATUS_OK = 200;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleApiRegister = () => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.status === STATUS_OK) {
          response.json().then((data) => {
            localStorage.setItem('user', JSON.stringify({
              name: data.name,
              email: data.email,
              role: data.role,
              token: data.token,
            }));
            if (data.role === 'customer') {
              history.push('/customer/products');
            } else if (data.role === 'administrator') {
              history.push('/admin/manage');
            } else if (data.role === 'seller') {
              history.push('/seller/orders');
            } else {
              console.error('Invalid role:', data.role);
            }
          });
        } else if (response.status === STATUS_NOT_FOUND) {
          setregisterError(true);
        }
      })
      .catch((error) => {
        console.error('Register failed', error);
      });
  };

  const handleRegister = () => {
    handleApiRegister();
  };

  const isEmailValid = (myEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(myEmail);
  };

  const isPasswordValid = (myPassword) => myPassword.length >= PASSWORD_LENGTH;

  const isNameValid = (myName) => myName.length >= NAME_LENGTH;

  const isRegisterDisabled = !isEmailValid(email)
  || !isPasswordValid(password) || !isNameValid(name);

  return (
    <div>
      <label htmlFor="name-input">
        Name:
        <input
          data-testid="admin_manage__input-name"
          id="name-input"
          type="name"
          value={ name }
          onChange={ handleNameChange }
        />
      </label>
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="admin_manage__input-email"
          id="email-input"
          type="email"
          value={ email }
          onChange={ handleEmailChange }
        />
      </label>
      <label htmlFor="password-input">
        Password:
        <input
          data-testid="admin_manage__input-password"
          id="password-input"
          type="password"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </label>
      <label htmlFor="role-selector">
        Type:
        <select
          data-testid="admin_manage__select-role"
          id="role-selector"
          value={ role }
          onChange={ handleRoleChange }
        >
          <option value="Seller">Seller</option>
          <option value="Customer">Customer</option>
          <option value="Administrator">Administrator</option>
        </select>
      </label>
      <button
        data-testid="admin_manage__button-register"
        onClick={ handleRegister }
        type="button"
        disabled={ isRegisterDisabled }
      >
        Register
      </button>
      {
        registerError && (
          <p>
            Invalid fields
          </p>)
      }
    </div>
  );
}

export default AdminForm;
