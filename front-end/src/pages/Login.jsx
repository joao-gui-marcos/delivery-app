import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const PASSWORD_LENGTH = 6;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleApiLogin = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login successful', data);
        // TODO: Update user authentication status
        // TODO: Redirect user to home page
      })
      .catch((error) => {
        console.error('Login failed', error);
        setError('Login failed. Please try again.');
      });
  };

  const handleLogin = () => {
    console.log('Logging in with email:', email, 'and password:', password);
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
      <label htmlFor="email-input">
        Login:
        <input
          data-testid="common_login__input-email"
          id="email-input"
          type="email"
          value={ email }
          onChange={ handleEmailChange }
        />
      </label>
      <br />
      <label htmlFor="password-input">
        Senha:
        <input
          data-testid="common_login__input-password"
          id="password-input"
          type="password"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </label>
      <br />
      <button
        data-testid="common_login__button-login"
        onClick={ handleLogin }
        type="button"
        disabled={ isLoginDisabled }
      >
        LOGIN
      </button>
      <button
        data-testid="common_login__button-register"
        onClick={ handleSignup }
        type="button"
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}

export default Login;
