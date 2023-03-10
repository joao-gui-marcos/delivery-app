import React, { useState } from 'react';
import AdminForm from '../components/AdminForm';
import AdmUsersTable from '../components/AdmUsersTable';
import CustomerNavBar from '../components/CustomerNavBar';

function Admin() {
  const userData = localStorage.getItem('user');
  const mockUsers = [
    {
      name: 'JoaoGui',
      email: 'joao@email.com',
      role: 'customer',
    },
  ];
  const [users] = useState(mockUsers);

  // useEffect(() => {
  //   fetch('http://localhost:3001/products', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: JSON.parse(userData).token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data))
  //     .catch((error) => console.error('Error fetching products', error));
  // }, [userData]);

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <AdminForm />
      <AdmUsersTable users={ users } />
    </div>
  );
}

export default Admin;
