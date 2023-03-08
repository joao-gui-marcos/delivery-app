import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Provider from './contexts/AppProvider';
import CustomerCheckout from './pages/CustomerCheckout';
import CustomerOrderDetail from './pages/CustomerOrderDetail';
import CustomerOrders from './pages/CustomerOrders';
import CustomerProducts from './pages/CustomerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerOrderDetail from './pages/SellerOrderDetail';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/customer/products" component={ CustomerProducts } />
          <Route path="/customer/checkout" component={ CustomerCheckout } />
          <Route exact path="/customer/orders" component={ CustomerOrders } />
          <Route exact path="/customer/orders/:id" component={ CustomerOrderDetail } />
          <Route exact path="/seller/orders" component={ SellerOrders } />
          <Route exact path="/seller/orders/:id" component={ SellerOrderDetail } />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
