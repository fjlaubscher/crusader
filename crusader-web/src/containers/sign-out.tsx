import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

// state
import { CrusadeAtom } from '../state/crusade';
import { OrderOfBattleAtom } from '../state/order-of-battle';
import { PlayerAtom } from '../state/player';

// hooks
import useToast from '../hooks/use-toast';

// storage
import { PLAYER } from '../helpers/storage';

const SignOut = () => {
  const toast = useToast();
  const setCrusade = useSetRecoilState(CrusadeAtom);
  const setOrderOfBattle = useSetRecoilState(OrderOfBattleAtom);
  const setPlayer = useSetRecoilState(PlayerAtom);

  useEffect(() => {
    localStorage.removeItem(PLAYER);
    setCrusade(null);
    setOrderOfBattle(null);
    setPlayer(null);
    toast({
      variant: 'success',
      text: `You've been signed out`
    });
  }, []);

  return <Navigate to="/" />;
};

export default SignOut;
