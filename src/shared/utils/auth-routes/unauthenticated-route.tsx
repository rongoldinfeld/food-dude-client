import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserContext } from '../../../providers/user-provider';

const RouteUnauthenticated = ({ component: Component, path }: RouteProps) => {
  const authContext = useContext(UserContext);
  if (!!authContext.user) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteUnauthenticated;
