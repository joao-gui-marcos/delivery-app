import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

function CustomerInfoForm() {
  const { seller, setSeller } = useContext(AppContext);
  const { address, setAddress } = useContext(AppContext);
  const { addressNumber, setAddressNumber } = useContext(AppContext);

  const handleSellerChange = (event) => {
    setSeller(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAddressNumberChange = (event) => {
    setAddressNumber(event.target.value);
  };

  return (
    <div>
      <label htmlFor="seller">
        Select Seller:
        <select
          data-testid="customer_checkout__select-seller"
          id="seller"
          name="seller"
          value={ seller }
          onChange={ handleSellerChange }
        >
          <option value="Fulana Pereira">Fulana Pereira</option>
          <option value="Fulana Pereira">Fulana Pereira</option>
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
