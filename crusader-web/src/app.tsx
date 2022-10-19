import React, { Suspense, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAsync } from 'react-use';
import { Loader } from '@fjlaubscher/matter';

// api
import { getBattlefieldRolesAsync, getBattleStatusesAsync, getFactionsAsync } from './api/config';
import { getPlayerOrdersOfBattleAsync } from './api/order-of-battle';

// state
import { BattlefieldRoleAtom, FactionAtom, BattleStatusAtom } from './state/config';
import { PlayerOrdersOfBattleAtom } from './state/order-of-battle';
import { PlayerAtom } from './state/player';

// storage
import { PLAYER } from './helpers/storage';

import Routes from './routes';

const Router = () => {
  const [player, setPlayer] = useRecoilState(PlayerAtom);
  const setBattlefieldRoles = useSetRecoilState(BattlefieldRoleAtom);
  const setBattleStatuses = useSetRecoilState(BattleStatusAtom);
  const setFactions = useSetRecoilState(FactionAtom);
  const setPlayerOrdersOfBattle = useSetRecoilState(PlayerOrdersOfBattleAtom);

  const { loading: loadingConfig } = useAsync(async () => {
    const [battlefieldRoles, battleStatuses, factions] = await Promise.all([
      getBattlefieldRolesAsync(),
      getBattleStatusesAsync(),
      getFactionsAsync()
    ]);

    if (battlefieldRoles) {
      setBattlefieldRoles(battlefieldRoles);
    }

    if (battleStatuses) {
      setBattleStatuses(battleStatuses);
    }

    if (factions) {
      setFactions(factions);
    }
  });

  const { loading: loadingOrdersOfBattle } = useAsync(async () => {
    if (player) {
      const ordersOfBattle = await getPlayerOrdersOfBattleAsync(player.id);
      if (ordersOfBattle) {
        setPlayerOrdersOfBattle(ordersOfBattle);
      }
    }
  }, [player]);

  useEffect(() => {
    const storedPlayer = localStorage.getItem(PLAYER);
    if (storedPlayer && !player) {
      const parsedPlayer = JSON.parse(storedPlayer) as Crusader.Player;
      setPlayer(parsedPlayer);
    }
  }, []);

  const loading = loadingConfig || loadingOrdersOfBattle;

  return loading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes />
    </Suspense>
  );
};

export default Router;
