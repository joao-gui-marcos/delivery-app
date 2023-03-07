const API_URL = 'http://localhost:3001';

const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    if (response.ok) {
      const orders = await response.json();
      return orders;
    }
    throw new Error(`Failed to fetch orders: ${response.status}`);
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export default {
  fetchOrders,
};
