import React, { useMemo, useState } from 'react';
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

  const { totalBattles, totalBattlesWon, totalCrusades, highestSupply } = useMemo(() => {
    let totalBattles = 0;
    let totalBattlesWon = 0;
    let playerCrusades: number[] = [];
    let highestSupply = 0;

    if (ordersOfBattle) {
      for (let i = 0; i < ordersOfBattle.length; i++) {
        const orderOfBattle = ordersOfBattle[i];

        if (playerCrusades.indexOf(orderOfBattle.crusadeId) < 0) {
          playerCrusades.push(orderOfBattle.crusadeId);
        }

        totalBattles += orderOfBattle.battles;
        totalBattlesWon += orderOfBattle.battlesWon;

        if (orderOfBattle.supplyUsed > highestSupply) {
          highestSupply = orderOfBattle.supplyUsed;
        }
      }
    }

    return {
      totalBattles,
      totalBattlesWon,
      totalCrusades: playerCrusades.length,
      highestSupply
    };
  }, [ordersOfBattle]);

  const isCurrentPlayer = currentPlayer && id ? currentPlayer.id === parseInt(id) : false;

  return (
    <Layout
      title={player ? player.name : 'Player'}
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
          <div className={styles.stats}>
            <Stat title="Crusades" value={totalCrusades} />
            <Stat title="Orders of Battle" value={ordersOfBattle.length} />
            <Stat title="Largest Force" value={`${highestSupply}PR`} />
            <Stat
              title="Battles Won"
              value={totalBattlesWon}
              description={`Total Battles: ${totalBattles}`}
            />
          </div>
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
