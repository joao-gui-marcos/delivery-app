import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    // TODO: Implement login logic
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
      <label htmlFor="name-input">
        Nome:
        <input
          data-testid="common_register__input-name"
          id="name-input"
          type="name"
          value={ name }
          onChange={ handleNameChange }
        />
      </label>
      <br />
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="common_register__input-email"
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
          data-testid="common_register__input-password"
          id="password-input"
          type="password"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </label>
      <br />
      <button
        data-testid="common_register__button-register"
        onClick={ handleRegister }
        type="button"
        disabled={ isRegisterDisabled }
      >
        CADASTRAR
      </button>
    </div>
  );
}

export default Register;
