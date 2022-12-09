import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { useRecoilValue } from 'recoil';
import { FaPen } from 'react-icons/fa';
import { IconButton, Stat, Tabs } from '@fjlaubscher/matter';

// api
import { getPlayerCrusadesAsync } from '../../../api/crusade';
import { getPlayerOrdersOfBattleAsync } from '../../../api/order-of-battle';
import { getPlayerByIdAsync } from '../../../api/player';

// components
import Avatar from '../../../components/avatar';
import Layout from '../../../components/layout';

// state
import { PlayerAtom } from '../../../state/player';

// tabs
import AboutTab from './about-tab';
import CrusadesTab from './crusades-tab';
import OrdersOfBattleTab from './orders-of-battle-tab';
import SettingsTab from './settings-tab';

import styles from './overview.module.scss';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentPlayer = useRecoilValue(PlayerAtom);
  const [tabIndex, setTabIndex] = useState(0);

  const { loading: loadingCrusades, value: crusades } = useAsync(
    async () => (id ? getPlayerCrusadesAsync(id) : undefined),
    [id]
  );
  const { loading: loadingPlayer, value: player } = useAsync(
    async () => (id ? getPlayerByIdAsync(id) : undefined),
    [id]
  );
  const { loading: loadingOrdersOfBattle, value: ordersOfBattle } = useAsync(
    async () => (id ? getPlayerOrdersOfBattleAsync(id) : undefined),
    [id]
  );

  const isCurrentPlayer = currentPlayer && id ? currentPlayer.id === parseInt(id) : false;

  return (
    <Layout
      title="Profile"
      description={player?.name}
      image={player?.avatar}
      isLoading={loadingPlayer || loadingOrdersOfBattle || loadingCrusades}
      action={
        isCurrentPlayer && (
          <IconButton onClick={() => navigate(`/player/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
    >
      {player && ordersOfBattle && crusades && (
        <>
          <Stat title="Crusader" value={`@${player.name}`} />
          {player.avatar && (
            <Avatar className={styles.avatar} src={player.avatar} alt={player.name} />
          )}
          <Tabs
            active={tabIndex}
            onChange={setTabIndex}
            tabs={['About', 'Crusades', 'Orders of Battle', 'Settings']}
          >
            <AboutTab player={player} />
            <CrusadesTab crusades={crusades} player={player} />
            <OrdersOfBattleTab player={player} ordersOfBattle={ordersOfBattle} />
            <SettingsTab player={player} />
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default Player;
