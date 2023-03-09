import React, { useState, useEffect } from 'react';
import AdminForm from '../components/AdminForm';
import CustomerNavBar from '../components/CustomerNavBar';

function Admin() {
  const userData = localStorage.getItem('user');
  return (
    <div>
      <CustomerNavBar name={ JSON.parse(userData).name } />
      <AdminForm />
    </div>
  );
}

export default Admin;
