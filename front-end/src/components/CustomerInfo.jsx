import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../contexts/AppContext';

function CustomerInfoForm() {
  const { seller, setSeller } = useContext(AppContext);
  const { address, setAddress } = useContext(AppContext);
  const { addressNumber, setAddressNumber } = useContext(AppContext);
  const [sellers, setSellers] = useState([]);
  const userData = localStorage.getItem('user');

  const handleSellerChange = (event) => {
    setSeller(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAddressNumberChange = (event) => {
    setAddressNumber(event.target.value);
  };

  useEffect(() => {
    console.log(JSON.parse(userData).token);
    fetch('http://localhost:3001/user', {
      method: 'GET',
      headers: {
        Authorization: JSON.parse(userData).token,
      },
    })
      .then((response) => response.json())
      .then((data) => setSellers(data))
      .catch((error) => console.error('Error fetching sellers', error));
  }, []);

  return (
    <div className="customer-info">
      <label htmlFor="seller">
        Select Seller:
        <select
          data-testid="customer_checkout__select-seller"
          id="seller"
          name="seller"
          value={ seller }
          onChange={ handleSellerChange }
        >
          {sellers.length > 0
            ? (sellers.map((person, i) => (
              <option
                key={ i }
                value={ person.name }
              >
                {person.name}
              </option>)))
            : (null)}
        </select>
      </label>
      <label htmlFor="address">
        Address:
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          id="address"
          name="address"
          value={ address }
          onChange={ handleAddressChange }
        />
      </label>
      <label htmlFor="address-number">
        Address Number:
        <input
          data-testid="customer_checkout__input-address-number"
          type="text"
          id="address-number"
          name="address-number"
          value={ addressNumber }
          onChange={ handleAddressNumberChange }
        />
      </label>
    </div>
  );
}

export default CustomerInfoForm;
