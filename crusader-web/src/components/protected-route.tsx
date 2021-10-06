import React from 'react';
import { Route } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// containers
import SignIn from '../containers/sign-in';

// state
import { PlayerAtom } from '../state/player';

const ProtectedRoute = (props: RouteProps) => {
  const player = useRecoilValue(PlayerAtom);
  return player ? <Route {...props} /> : <SignIn />;
};

export default ProtectedRoute;
