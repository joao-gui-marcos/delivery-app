import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [seller, setSeller] = useState('Fulana Pereira');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  const context = useMemo(() => ({
    seller,
    setSeller,
    address,
    setAddress,
    addressNumber,
    setAddressNumber,
  }), [seller, address, addressNumber]);

  return (
    <main>
      <AppContext.Provider value={ context }>
        { children }
      </AppContext.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
