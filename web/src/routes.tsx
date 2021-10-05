import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

// containers
const CrusadeOverview = lazy(() => import('./containers/crusade'));
const CreateCrusade = lazy(() => import('./containers/crusade/create'));
const EditCrusade = lazy(() => import('./containers/crusade/edit'));
const JoinCrusade = lazy(() => import('./containers/crusade/join'));

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
    <Route path="/crusade/:id/join" exact component={JoinCrusade} />
    <Route path="/crusade/:id/edit" exact component={EditCrusade} />
    <Route path="/crusade/:id" exact component={CrusadeOverview} />
    <Route path="/crusade" exact component={CreateCrusade} />
    <Route path="/" exact component={Home} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
