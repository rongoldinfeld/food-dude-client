import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import routes, { AppRoute } from './route-config';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

function RouteWithSubRoutes(route: AppRoute) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

