import React, { useState, useEffect } from 'react';
import AdminForm from '../components/AdminForm';
import AdmUsersTable from '../components/AdmUsersTable';
import CustomerNavBar from '../components/CustomerNavBar';
import '../styles/Admin.css';

function Admin() {
  const userData = localStorage.getItem('user');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      fetch('http://localhost:3001/user/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: JSON.parse(userData).token,
        },
      })
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching users', error));
    };
    fetchUsers();
  }, [users]);

  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <AdminForm />
      <AdmUsersTable users={ users } />
    </div>
  );
}

export default Admin;
