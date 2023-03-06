import { useContext } from 'react';
import cart from './cart';
import AppContext from '../contexts/AppContext';

const useSale = () => {
  const { seller } = useContext(AppContext);
  const { address } = useContext(AppContext);
  const { addressNumber } = useContext(AppContext);
  const userData = JSON.parse(localStorage.getItem('user'));
  const products = cart.getItems();
  const totalPrice = cart.getTotal();

  return {
    userName: userData.name,
    sellerName: seller,
    totalPrice,
    deliveryAddress: address,
    deliveryNumber: addressNumber,
    products,
  };
};

export default useSale;
