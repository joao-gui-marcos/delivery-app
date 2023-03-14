import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo-nobg.png';
import '../styles/Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState(localStorage
    .getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const PASSWORD_LENGTH = 6;
  const URL = 'http://localhost:3001/login';
  const STATUS_NOT_FOUND = 404;
  const STATUS_OK = 200;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleApiLogin = () => {
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
              history.push('/admin/manage');
            } else if (data.role === 'seller') {
              history.push('/seller/orders');
            } else {
              console.error('Invalid role:', data.role);
            }
          });
        } else if (response.status === STATUS_NOT_FOUND) {
          console.log('Login failed');
          setLoginError(true);
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      if (userData.role === 'customer') {
        history.push('/customer/products');
      } else if (userData.role === 'administrator') {
        history.push('/admin/manage');
      } else if (userData.role === 'seller') {
        history.push('/seller/orders');
      } else {
        console.error('Invalid role:', userData.role);
      }
    }
  }, []);

  const handleLogin = () => {
    // TODO: Implement login logic
    handleApiLogin();
  };

  const handleSignup = () => {
    console.log('Navigating to signup page');
    // TODO: Implement navigation logic to signup page
    history.push('/register');
  };

  const isEmailValid = (myEmail) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(myEmail);
  };

  const isPasswordValid = (myPassword) => myPassword.length >= PASSWORD_LENGTH;

  const isLoginDisabled = !isEmailValid(email) || !isPasswordValid(password);

  return (
    <div>
      <img className="logom" src={ logo } alt="logomarca" />
      <div className="login-page">
        <label className="email-input-label" htmlFor="email-input">
          Login:
          <input
            className="email-input"
            data-testid="common_login__input-email"
            id="email-input"
            type="email"
            placeholder="  email@email.com"
            value={ email }
            onChange={ handleEmailChange }
          />
        </label>
        <br />
        <label className="password-input-label" htmlFor="password-input">
          Password:
          <input
            className="password-input"
            data-testid="common_login__input-password"
            id="password-input"
            type="password"
            placeholder="  **********"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </label>
        <br />
        <button
          className="login-button"
          data-testid="common_login__button-login"
          onClick={ handleLogin }
          type="button"
          disabled={ isLoginDisabled }
        >
          LOGIN
        </button>
        <button
          className="signup-button"
          data-testid="common_login__button-register"
          onClick={ handleSignup }
          type="button"
        >
          SIGN IN
        </button>
        {
          loginError && (
            <p
              data-testid="common_login__element-invalid-email"
              className="invalid-credentials"
            >
              Invalid credentials
            </p>)
        }
      </div>
    </div>
  );
}

export default Login;
