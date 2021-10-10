import React, { Suspense } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Progress } from '@chakra-ui/react';
import { useAsync, useMount } from 'react-use';

// api
import { getBattlefieldRolesAsync, getFactionsAsync } from './api/config';

// state
import { BattlefieldRoleAtom, FactionAtom } from './state/config';
import { PlayerAtom } from './state/player';

// storage
import { PLAYER } from './helpers/storage';

import Routes from './routes';

const Router = () => {
  const [player, setPlayer] = useRecoilState(PlayerAtom);
  const setBattlefieldRoles = useSetRecoilState(BattlefieldRoleAtom);
  const setFactions = useSetRecoilState(FactionAtom);

  const { loading } = useAsync(async () => {
    const [battlefieldRoles, factions] = await Promise.all([
      getBattlefieldRolesAsync(),
      getFactionsAsync()
    ]);

    if (battlefieldRoles) {
      setBattlefieldRoles(battlefieldRoles);
    }

    if (factions) {
      setFactions(factions);
    }
  });

  useMount(() => {
    const storedPlayer = localStorage.getItem(PLAYER);
    if (storedPlayer && !player) {
      const parsedPlayer = JSON.parse(storedPlayer) as Crusader.ListItem;
      setPlayer(parsedPlayer);
    }
  });

  return loading ? (
    <Progress isIndeterminate />
  ) : (
    <Suspense fallback={<Progress isIndeterminate />}>
      <Routes />
    </Suspense>
  );
};

export default Router;
