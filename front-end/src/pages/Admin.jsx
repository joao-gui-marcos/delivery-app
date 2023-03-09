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

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <AdminForm />
      <AdmUsersTable users={ users } />
    </div>
  );
}

export default Admin;
