import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import './index.css';
import Navbar from './navbar/navbar';
import UserProvider from './providers/user-provider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
