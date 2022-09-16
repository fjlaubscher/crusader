import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import ProtectedRoute from './components/protected-route';

// containers
const CrusadeOverview = lazy(() => import('./containers/crusade'));
const CreateCrusade = lazy(() => import('./containers/crusade/create'));
const CreateBattle = lazy(() => import('./containers/crusade/battle'));
const EditCrusade = lazy(() => import('./containers/crusade/edit'));
const JoinCrusade = lazy(() => import('./containers/crusade/join'));

const BattleOverview = lazy(() => import('./containers/battle'));
const Player = lazy(() => import('./containers/player'));
const OrderOfBattleOverview = lazy(() => import('./containers/order-of-battle'));
const EditOrderOfBattle = lazy(() => import('./containers/order-of-battle/edit'));

const CreateCrusadeCard = lazy(() => import('./containers/crusade-card/create'));
const CrusadeCard = lazy(() => import('./containers/crusade-card'));
const EditCrusadeCard = lazy(() => import('./containers/crusade-card/edit'));

const Home = lazy(() => import('./containers/home'));
const NotFound = lazy(() => import('./containers/not-found'));
const Settings = lazy(() => import('./containers/settings'));
const SignOut = lazy(() => import('./containers/sign-out'));

const AppRoutes = () => (
  <Routes>
    <Route
      path="/sign-out"
      element={
        <ProtectedRoute>
          <SignOut />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route path="/player/:id" element={<Player />} />

    <Route
      path="/order-of-battle/:id/crusade-card"
      element={
        <ProtectedRoute>
          <CreateCrusadeCard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/order-of-battle/:id/edit"
      element={
        <ProtectedRoute>
          <EditOrderOfBattle />
        </ProtectedRoute>
      }
    />
    <Route path="/order-of-battle/:id" element={<OrderOfBattleOverview />} />

    <Route
      path="/crusade-card/:id/edit"
      element={
        <ProtectedRoute>
          <EditCrusadeCard />
        </ProtectedRoute>
      }
    />
    <Route path="/crusade-card/:id" element={<CrusadeCard />} />

    <Route path="/crusade/:id/join" element={<JoinCrusade />} />
    <Route
      path="/crusade/:id/edit"
      element={
        <ProtectedRoute>
          <EditCrusade />
        </ProtectedRoute>
      }
    />
    <Route path="/crusade/:id/battle" element={<CreateBattle />} />
    <Route path="/crusade/:id" element={<CrusadeOverview />} />

    <Route path="/battle/:id" element={<BattleOverview />} />

    <Route
      path="/crusade"
      element={
        <ProtectedRoute>
          <CreateCrusade />
        </ProtectedRoute>
      }
    />

    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
