import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './index.css'
import Navbar from './navbar/navbar'
import RestaurantsFeed from './restaurants-feed/restaurants-feed'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/restaurants">
          <RestaurantsFeed />
        </Route>
        <Route exact={true} path="/" render={() => <Redirect to="/restaurants" />} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
