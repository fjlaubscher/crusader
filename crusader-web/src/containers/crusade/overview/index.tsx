import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPen, FaUserPlus } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useSessionStorage } from 'react-use';
import { parseISO, format } from 'date-fns';
import { IconButton, Stat, Tabs } from '@fjlaubscher/matter';

// api
import { getCrusadeAsync, getCrusadeBattlesAsync } from '../../../api/crusade';
import { getCrusadeOrdersOfBattleAsync } from '../../../api/order-of-battle';

// components
import Avatar from '../../../components/avatar';
import Layout from '../../../components/layout';
import LinkButton from '../../../components/button/link';

// helpers
import { CRUSADE_TAB } from '../../../helpers/storage';

// state
import { CrusadeAtom } from '../../../state/crusade';
import { PlayerAtom } from '../../../state/player';

// tabs
import AboutTab from './about-tab';
import BattlesTab from './battles-tab';
import OrdersOfBattleTab from './orders-of-battle-tab';
import SettingsTab from './settings-tab';

import styles from './overview.module.scss';

const Crusade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(CRUSADE_TAB);

  const player = useRecoilValue(PlayerAtom);
  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);

  const [battles, setBattles] = useState<Crusader.Battle[]>([]);
  const [ordersOfBattle, setOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>([]);

  const { loading } = useAsync(async () => {
    const crusade = id ? await getCrusadeAsync(id) : undefined;
    if (crusade) {
      setCurrentCrusade(crusade);

      const [battles, orders] = await Promise.all([
        getCrusadeBattlesAsync(crusade.id),
        getCrusadeOrdersOfBattleAsync(crusade.id)
      ]);

      if (battles) {
        setBattles(battles);
      }

      if (orders) {
        setOrdersOfBattle(orders);
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = currentCrusade ? currentCrusade.createdById === playerId : false;
  const hasJoined = playerId
    ? ordersOfBattle.filter((o) => o.playerId === playerId).length > 0
    : false;

  return (
    <Layout
      title="Crusade"
      description={currentCrusade?.name}
      image={currentCrusade?.avatar}
      action={
        isOwner && (
          <IconButton onClick={() => navigate(`/crusade/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loading}
    >
      {currentCrusade && (
        <>
          <Stat
            title={`@${currentCrusade.createdBy}'s`}
            value={currentCrusade.name}
            description={`Created on ${format(parseISO(currentCrusade.createdDate), 'yyyy-MM-dd')}`}
          />
          {currentCrusade.avatar && (
            <Avatar
              className={styles.avatar}
              src={currentCrusade.avatar}
              alt={currentCrusade.name}
            />
          )}
          {!hasJoined && (
            <LinkButton
              className={styles.join}
              variant="accent"
              leftIcon={<FaUserPlus />}
              to={`/crusade/${id}/join`}
            >
              Join Crusade
            </LinkButton>
          )}
          <Tabs
            className={styles.tabs}
            active={tabIndex || 0}
            onChange={setTabIndex}
            tabs={['About', 'Battles', 'Crusaders', 'Settings']}
          >
            <AboutTab crusade={currentCrusade} />
            <BattlesTab battles={battles} crusade={currentCrusade} hasJoinedCrusade={hasJoined} />
            <OrdersOfBattleTab ordersOfBattle={ordersOfBattle} />
            <SettingsTab crusade={currentCrusade} />
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default Crusade;
