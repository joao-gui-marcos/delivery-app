import React, { useState } from 'react';

function AdminForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Seller');

  const handleRegister = (event) => {
    // Register new user with the form data
    event.preventDefault();
    console.log({ name, email, password, type });
  };

  return (
    <form>
      <label htmlFor="name-input">
        Name:
        <input
          data-testid="admin_manage__input-name"
          id="name-input"
          type="text"
          value={ name }
          onChange={ (event) => setName(event.target.value) }
        />
      </label>
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="admin_manage__input-email"
          id="email-input"
          type="email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Password:
        <input
          data-testid="admin_manage__input-password"
          id="password-input"
          type="password"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
        />
      </label>
      <label htmlFor="role-selector">
        Type:
        <select
          data-testid="admin_manage__select-role"
          id="role-selector"
          value={ type }
          onChange={ (event) => setType(event.target.value) }
        >
          <option value="Seller">Seller</option>
          <option value="Customer">Customer</option>
          <option value="Administrator">Administrator</option>
        </select>
      </label>
      <button
        data-testid="admin_manage__button-register"
        type="button"
        onClick={ handleRegister }
      >
        Register
      </button>
    </form>
  );
}

export default AdminForm;
