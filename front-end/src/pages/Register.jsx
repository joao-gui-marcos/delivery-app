import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo-nobg.png';
import '../styles/Register.css';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState(false);
  const PASSWORD_LENGTH = 6;
  const NAME_LENGTH = 12;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    // TODO: Implement register logic
    const url = 'http://localhost:3001/user'; // Replace with your API URL
    const userData = {
      name,
      email,
      password,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('User registered successfully');
          response.json().then((data) => {
            console.log('Login successful');
            localStorage.setItem('user', JSON.stringify({
              name: data.name,
              email: data.email,
              role: data.role,
              token: data.token,
            }));
            if (data.role === 'customer') {
              history.push('/customer/products');
            } else if (data.role === 'administrator') {
              history.push('/admin/dashboard');
            } else if (data.role === 'seller') {
              history.push('/seller/products');
            } else {
              console.error('Invalid role:', data.role);
            }
          });
        } else {
          console.error('User registration failed');
          setRegisterError(true);
        }
      })
      .catch((error) => {
        console.error('User registration failed', error);
      });
  };

  const isEmailValid = (myEmail) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(myEmail);
  };

  const isPasswordValid = (myPassword) => myPassword.length >= PASSWORD_LENGTH;

  const isNameValid = (myName) => myName.length >= NAME_LENGTH;

  const isRegisterDisabled = !isEmailValid(email)
  || !isPasswordValid(password) || !isNameValid(name);

  return (
    <div>
      <img className="logo" src={ logo } alt="logomarca" />
      <div className="register-form">
        <label className="name-input-label" htmlFor="name-input">
          Name:
          <input
            className="name-input"
            data-testid="common_register__input-name"
            id="name-input"
            type="name"
            value={ name }
            onChange={ handleNameChange }
          />
        </label>
        <br />
        <label className="email-input-label" htmlFor="email-input">
          Email:
          <input
            className="email-input"
            data-testid="common_register__input-email"
            id="email-input"
            type="email"
            value={ email }
            onChange={ handleEmailChange }
          />
        </label>
        <br />
        <label className="password-input-label" htmlFor="password-input">
          Password:
          <input
            className="password-input"
            data-testid="common_register__input-password"
            id="password-input"
            type="password"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </label>
        <br />
        <button
          className="register-button"
          data-testid="common_register__button-register"
          onClick={ handleRegister }
          type="button"
          disabled={ isRegisterDisabled }
        >
          SIGN IN
        </button>
        {
          registerError && (
            <p
              data-testid="common_register__element-invalid_register"
              className="invalid-credentials"
            >
              User already exists
            </p>)
        }
      </div>
    </div>
  );
}

export default Register;
