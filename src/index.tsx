import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
import history from './history';
import './index.css';
import Navbar from './navbar/navbar';
import UserProvider from './providers/user-provider';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <UserProvider>
        <Navbar />
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
