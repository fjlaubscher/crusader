import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import ProtectedRoute from './components/protected-route';

// containers
const CrusadeOverview = lazy(() => import('./containers/crusade'));
const CreateCrusade = lazy(() => import('./containers/crusade/create'));
const EditCrusade = lazy(() => import('./containers/crusade/edit'));
const JoinCrusade = lazy(() => import('./containers/crusade/join'));

const OrdersOfBattle = lazy(() => import('./containers/orders-of-battle'));
const OrderOfBattleOverview = lazy(() => import('./containers/order-of-battle'));
const EditOrderOfBattle = lazy(() => import('./containers/order-of-battle/edit'));

const CreateCrusadeCard = lazy(() => import('./containers/crusade-card/create'));
const CrusadeCard = lazy(() => import('./containers/crusade-card'));
const EditCrusadeCard = lazy(() => import('./containers/crusade-card/edit'));

const Home = lazy(() => import('./containers/home'));
const NotFound = lazy(() => import('./containers/not-found'));
const Settings = lazy(() => import('./containers/settings'));
const SignOut = lazy(() => import('./containers/sign-out'));

const Routes = () => (
  <Switch>
    <ProtectedRoute path="/sign-out" exact component={SignOut} />
    <ProtectedRoute path="/settings" exact component={Settings} />
    <ProtectedRoute path="/orders-of-battle" exact component={OrdersOfBattle} />
    <ProtectedRoute path="/order-of-battle/:id/crusade-card" exact component={CreateCrusadeCard} />
    <ProtectedRoute path="/order-of-battle/:id/edit" exact component={EditOrderOfBattle} />
    <Route path="/order-of-battle/:id" exact component={OrderOfBattleOverview} />
    <ProtectedRoute path="/crusade-card/:id/edit" exact component={EditCrusadeCard} />
    <Route path="/crusade-card/:id" exact component={CrusadeCard} />
    <ProtectedRoute path="/crusade/:id/join" exact component={JoinCrusade} />
    <ProtectedRoute path="/crusade/:id/edit" exact component={EditCrusade} />
    <Route path="/crusade/:id" exact component={CrusadeOverview} />
    <ProtectedRoute path="/crusade" exact component={CreateCrusade} />
    <ProtectedRoute path="/" exact component={Home} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
