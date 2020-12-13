import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import RestaurantsFeed from './restaurants-feed/restaurants-feed';
import Restaurant from './restaurant/restaurant';

export default function App() {
  return (
    <div>
      <Switch>
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
