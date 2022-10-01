import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import ProtectedRoute from './components/protected-route';

// containers
const CrusadeOverview = lazy(() => import('./containers/crusade/overview'));
const CreateCrusade = lazy(() => import('./containers/crusade/create'));
const CreateBattle = lazy(() => import('./containers/battle/create'));
const EditCrusade = lazy(() => import('./containers/crusade/edit'));
const JoinCrusade = lazy(() => import('./containers/crusade/join'));

const BattleOverview = lazy(() => import('./containers/battle/overview'));
const EditBattle = lazy(() => import('./containers/battle/edit'));
const EditBattleScore = lazy(() => import('./containers/battle/score'));

const PlayerOverview = lazy(() => import('./containers/player/overview'));
const PlayerEdit = lazy(() => import('./containers/player/edit'));
const OrderOfBattleOverview = lazy(() => import('./containers/order-of-battle/overview'));
const EditOrderOfBattle = lazy(() => import('./containers/order-of-battle/edit'));

const CrusadeCardOverview = lazy(() => import('./containers/crusade-card/overview'));
const CreateCrusadeCard = lazy(() => import('./containers/crusade-card/create'));
const EditCrusadeCard = lazy(() => import('./containers/crusade-card/edit'));

const Lists = lazy(() => import('./containers/list/lists'));
const ListOverview = lazy(() => import('./containers/list/overview'));
const EditList = lazy(() => import('./containers/list/edit'));
const CreateList = lazy(() => import('./containers/list/create'));

const Home = lazy(() => import('./containers/home'));
const NotFound = lazy(() => import('./containers/not-found'));
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
      path="/player/:id/edit"
      element={
        <ProtectedRoute>
          <PlayerEdit />
        </ProtectedRoute>
      }
    />
    <Route path="/player/:id" element={<PlayerOverview />} />

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
    <Route path="/crusade-card/:id" element={<CrusadeCardOverview />} />

    <Route path="/crusade/:id/join" element={<JoinCrusade />} />
    <Route
      path="/crusade/:id/edit"
      element={
        <ProtectedRoute>
          <EditCrusade />
        </ProtectedRoute>
      }
    />
    <Route
      path="/crusade/:id/battle"
      element={
        <ProtectedRoute>
          <CreateBattle />
        </ProtectedRoute>
      }
    />
    <Route path="/crusade/:id" element={<CrusadeOverview />} />

    <Route path="/battle/:id" element={<BattleOverview />} />
    <Route
      path="/battle/:id/edit"
      element={
        <ProtectedRoute>
          <EditBattle />
        </ProtectedRoute>
      }
    />
    <Route
      path="/battle/:id/score"
      element={
        <ProtectedRoute>
          <EditBattleScore />
        </ProtectedRoute>
      }
    />

    <Route
      path="/crusade"
      element={
        <ProtectedRoute>
          <CreateCrusade />
        </ProtectedRoute>
      }
    />

    <Route
      path="/list/:id/edit"
      element={
        <ProtectedRoute>
          <EditList />
        </ProtectedRoute>
      }
    />
    <Route path="/list/:id" element={<ListOverview />} />
    <Route
      path="/list"
      element={
        <ProtectedRoute>
          <CreateList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/lists"
      element={
        <ProtectedRoute>
          <Lists />
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
