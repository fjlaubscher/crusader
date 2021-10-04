import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

// containers
const Home = lazy(() => import('./containers/home'));
const NotFound = lazy(() => import('./containers/not-found'));
const OrdersOfBattle = lazy(() => import('./containers/orders-of-battle'));
const Settings = lazy(() => import('./containers/settings'));
const SignOut = lazy(() => import('./containers/sign-out'));

const Routes = () => (
  <Switch>
    <Route path="/sign-out" exact component={SignOut} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/orders-of-battle" exact component={OrdersOfBattle} />
    <Route path="/" exact component={Home} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
