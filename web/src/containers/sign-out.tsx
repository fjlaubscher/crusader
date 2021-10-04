import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

// state
import { CrusadesAtom } from '../state/crusade';
import { OrdersOfBattleAtom } from '../state/order-of-battle';
import { PlayerAtom } from '../state/player';

// storage
import { PLAYER } from '../helpers/storage';

const SignOut = () => {
  const setCrusades = useSetRecoilState(CrusadesAtom);
  const setOrdersOfBattle = useSetRecoilState(OrdersOfBattleAtom);
  const setPlayer = useSetRecoilState(PlayerAtom);

  useEffect(() => {
    localStorage.removeItem(PLAYER);
    setCrusades([]);
    setOrdersOfBattle([]);
    setPlayer(null);
  }, []);

  return <Redirect to="/" />;
};

export default SignOut;
