import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FaBars } from 'react-icons/fa';
import { useAsync, useSessionStorage } from 'react-use';

// api
import { getPlayerCrusadesAsync } from '../../api/crusade';

// components
import CrusadesTab from './crusades-tab';
import IconButton from '../../components/button/icon';
import Layout from '../../components/layout';
import OrdersOfBattleTab from './orders-of-battle-tab';
import Sidebar from '../../components/sidebar';
import Tabs from '../../components/tabs';

// helpers
import { HOME_TAB } from '../../helpers/storage';

// state
import { PlayerAtom } from '../../state/player';
import { PlayerOrdersOfBattleAtom } from '../../state/order-of-battle';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <>
      <Sidebar visible={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Layout
        title="Home"
        action={
          <IconButton onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </IconButton>
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
    </>
  );
};

export default Home;
