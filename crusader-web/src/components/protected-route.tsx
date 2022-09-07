import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// containers
import SignIn from '../containers/sign-in';

// state
import { PlayerAtom } from '../state/player';

const ProtectedRoute = ({ children }: RouteProps) => {
  const player = useRecoilValue(PlayerAtom);
  return player ? <>{children}</> : <SignIn />;
};

export default ProtectedRoute;
