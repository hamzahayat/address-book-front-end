import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

// import Register from '../components/Register';
import Home from './Home';
import Login from './Login';
import './index.css';

// Function to Check if user authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};

// Declare Private Route Component
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/contacts" component={Home} />
    </Switch>
  </BrowserRouter>
);
