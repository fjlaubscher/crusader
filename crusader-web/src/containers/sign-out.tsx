import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

// state
import { CrusadeAtom } from '../state/crusade';
import { OrderOfBattleAtom } from '../state/order-of-battle';
import { PlayerAtom } from '../state/player';

// storage
import { PLAYER } from '../helpers/storage';

const SignOut = () => {
  const setCrusade = useSetRecoilState(CrusadeAtom);
  const setOrderOfBattle = useSetRecoilState(OrderOfBattleAtom);
  const setPlayer = useSetRecoilState(PlayerAtom);

  useEffect(() => {
    localStorage.removeItem(PLAYER);
    setCrusade(null);
    setOrderOfBattle(null);
    setPlayer(null);
  }, []);

  return <Redirect to="/" />;
};

export default SignOut;
