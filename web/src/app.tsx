import React, { Suspense, useEffect, lazy, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Progress } from '@chakra-ui/react';

// api
import { getBattlefieldRolesAsync, getFactionsAsync } from './api/config';
import { getPlayerCrusadesAsync } from './api/crusade';
import { getPlayerOrdersOfBattleAsync } from './api/order-of-battle';

// containers
const SignIn = lazy(() => import('./containers/sign-in'));

// state
import { BattlefieldRoleAtom, FactionAtom } from './state/config';
import { CrusadesAtom } from './state/crusade';
import { OrdersOfBattleAtom } from './state/order-of-battle';
import { PlayerAtom } from './state/player';

// storage
import { PLAYER } from './helpers/storage';

import Routes from './routes';

const Router = () => {
  const storedPlayer = localStorage.getItem(PLAYER);

  const [startedSyncing, setStartedSyncing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [player, setPlayer] = useRecoilState(PlayerAtom);
  const setBattlefieldRoles = useSetRecoilState(BattlefieldRoleAtom);
  const setFactions = useSetRecoilState(FactionAtom);
  const setCrusades = useSetRecoilState(CrusadesAtom);
  const setOrdersOfBattle = useSetRecoilState(OrdersOfBattleAtom);

  async function getPlayerData() {
    if (player) {
      setLoading(true);
      
      const [battlefieldRoles, factions, crusades, ordersOfBattle] = await Promise.all([
        getBattlefieldRolesAsync(),
        getFactionsAsync(),
        getPlayerCrusadesAsync(player.id),
        getPlayerOrdersOfBattleAsync(player.id)
      ]);

      if (battlefieldRoles) {
        setBattlefieldRoles(battlefieldRoles);
      }

      if (factions) {
        setFactions(factions);
      }

      if (crusades) {
        setCrusades(crusades);
      }

      if (ordersOfBattle) {
        setOrdersOfBattle(ordersOfBattle);
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    if (storedPlayer && !player) {
      const parsedPlayer = JSON.parse(storedPlayer) as Crusader.ListItem;
      setPlayer(parsedPlayer);
    }

    if (player && !loading && !startedSyncing) {
      setStartedSyncing(true);
      getPlayerData();
    }
  }, [storedPlayer, player, setPlayer, loading, setLoading, startedSyncing, setStartedSyncing]);

  return loading ? (
    <Progress isIndeterminate />
  ) : (
    <Suspense fallback={<Progress isIndeterminate />}>{player ? <Routes /> : <SignIn />}</Suspense>
  );
};

export default Router;
