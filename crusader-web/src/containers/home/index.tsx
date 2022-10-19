import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FaPowerOff } from 'react-icons/fa';
import { useAsync, useSessionStorage } from 'react-use';
import { Link } from 'react-router-dom';
import { Tabs } from '@fjlaubscher/matter';

// api
import { getPlayerCrusadesAsync } from '../../api/crusade';

// components
import CrusadesTab from './crusades-tab';
import Layout from '../../components/layout';
import OrdersOfBattleTab from './orders-of-battle-tab';

// helpers
import { HOME_TAB } from '../../helpers/storage';

// state
import { PlayerAtom } from '../../state/player';
import { PlayerOrdersOfBattleAtom } from '../../state/order-of-battle';

import styles from './home.module.scss';

const Home = () => {
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(HOME_TAB);
  const player = useRecoilValue(PlayerAtom);
  const ordersOfBattle = useRecoilValue(PlayerOrdersOfBattleAtom);

  const { loading, value: crusades } = useAsync(async () => {
    if (player) {
      return await getPlayerCrusadesAsync(player.id);
    }

    return undefined;
  }, [player]);

  return (
    <Layout
      title="Home"
      action={
        <Link className={styles.signOut} to="/sign-out">
          <FaPowerOff />
        </Link>
      }
      isLoading={loading}
    >
      <Tabs
        tabs={['Orders of Battle', 'Your Crusades']}
        active={tabIndex || 0}
        onChange={setTabIndex}
      >
        <OrdersOfBattleTab ordersOfBattle={ordersOfBattle} />
        <CrusadesTab crusades={crusades} />
      </Tabs>
    </Layout>
  );
};

export default Home;
