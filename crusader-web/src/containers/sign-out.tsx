import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useToast } from '@fjlaubscher/matter';

// state
import { BattlesAtom } from '../state/battle';
import { CrusadeCardsAtom } from '../state/crusade-card';
import { OrdersOfBattleAtom, PlayerOrdersOfBattleAtom } from '../state/order-of-battle';
import { PlayerAtom } from '../state/player';

// storage
import { PLAYER } from '../helpers/storage';

const SignOut = () => {
  const toast = useToast();

  const setBattles = useSetRecoilState(BattlesAtom);
  const setCrusadeCards = useSetRecoilState(CrusadeCardsAtom);
  const setPlayer = useSetRecoilState(PlayerAtom);
  const setPlayerOrdersOfBattle = useSetRecoilState(PlayerOrdersOfBattleAtom);
  const setOrdersOfBattle = useSetRecoilState(OrdersOfBattleAtom);

  useEffect(() => {
    localStorage.removeItem(PLAYER);

    setBattles([]);
    setCrusadeCards([]);
    setPlayer(null);
    setPlayerOrdersOfBattle([]);
    setOrdersOfBattle([]);

    toast({
      variant: 'success',
      text: `You've been signed out`
    });
  }, []);

  return <Navigate to="/" />;
};

export default SignOut;
