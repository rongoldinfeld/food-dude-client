import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './login/login';
import Restaurant from './restaurant/restaurant';
import RestaurantsFeed from './restaurants-feed/restaurants-feed';
import RouteAuthenticated from './shared/utils/auth-routes/authenticated-route';
import RouteUnauthenticated from './shared/utils/auth-routes/unauthenticated-route';

export default function App() {
  return (
    <div>
      <Switch>
        <RouteUnauthenticated path={`/login`} component={Login} />
        <RouteAuthenticated path={`/restaurants/:id`} component={Restaurant} />
        <RouteAuthenticated path="/restaurants" component={RestaurantsFeed} />
        <Route path="/" exact={true} render={() => <Redirect to={'/restaurants'} />} />
      </Switch>
    </div>
  );
}
