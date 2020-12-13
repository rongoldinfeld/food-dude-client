import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Restaurant from './restaurant/restaurant';
import RestaurantsFeed from './restaurants-feed/restaurants-feed';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path={`/login`}>
          <Login />
        </Route>
        <Route path={`/restaurants/:id`}>
          <Restaurant />
        </Route>
        <Route path="/restaurants">
          <RestaurantsFeed />
        </Route>
        <Route path="/" exact={true} render={() => <Redirect to={'/restaurants'} />} />
      </Switch>
    </div>
  );
}
