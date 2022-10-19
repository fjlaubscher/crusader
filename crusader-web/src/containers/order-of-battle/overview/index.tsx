import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPen, FaUsers } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useSessionStorage } from 'react-use';
import { IconButton, Tabs, Stat } from '@fjlaubscher/matter';

// api
import { getOrderOfBattleCrusadeCardsAsync } from '../../../api/crusade-card';
import { getOrderOfBattleAsync, getOrderOfBattleBattlesAsync } from '../../../api/order-of-battle';

// components
import Layout from '../../../components/layout';
import LinkButton from '../../../components/button/link';

// helpers
import { ORDER_OF_BATTLE_TAB } from '../../../helpers/storage';

// state
import { OrderOfBattleAtom } from '../../../state/order-of-battle';
import { PlayerAtom } from '../../../state/player';

// tabs
import AboutTab from './about-tab';
import BattlesTab from './battles-tab';
import CardsTab from './cards-tab';
import SettingsTab from './settings-tab';

import styles from './overview.module.scss';

const OrderOfBattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(ORDER_OF_BATTLE_TAB);

  const [orderOfBattle, setOrderOfBattle] = useRecoilState(OrderOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const [battles, setBattles] = useState<Crusader.Battle[]>([]);
  const [crusadeCards, setCrusadeCards] = useState<Crusader.CrusadeCard[]>([]);

  const { loading } = useAsync(async () => {
    const oob = id ? await getOrderOfBattleAsync(id) : undefined;
    if (oob) {
      setOrderOfBattle(oob);

      const [battles, cards] = await Promise.all([
        getOrderOfBattleBattlesAsync(oob.id),
        getOrderOfBattleCrusadeCardsAsync(oob.id)
      ]);

      if (battles) {
        setBattles(battles);
      }

      if (cards) {
        setCrusadeCards(cards);
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = orderOfBattle && orderOfBattle.playerId === playerId;

  return (
    <Layout
      title="Order of Battle"
      action={
        isOwner && (
          <IconButton onClick={() => navigate(`/order-of-battle/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loading}
    >
      {orderOfBattle && (
        <>
          <LinkButton
            className={styles.crusadeButton}
            leftIcon={<FaUsers />}
            to={`/crusade/${orderOfBattle.crusadeId}`}
          >
            {orderOfBattle.crusade}
          </LinkButton>
          <Stat
            title={`@${orderOfBattle.player}'s`}
            value={orderOfBattle.name}
            description={orderOfBattle.faction}
          />
          <div className={styles.stats}>
            <Stat
              title="Power Rating"
              value={`${orderOfBattle.supplyUsed}PR`}
              description={`Supply Limit: ${orderOfBattle.supplyLimit}PR`}
            />
            <Stat title="Crusade Points" value={`${orderOfBattle.crusadePoints}CP`} />
            <Stat title="Requisition" value={`${orderOfBattle.requisition}RP`} />
            <Stat
              title="Battles Won"
              value={orderOfBattle.battlesWon}
              description={`Total Battles: ${orderOfBattle.battles}`}
            />
          </div>
          <Tabs
            active={tabIndex || 0}
            onChange={setTabIndex}
            tabs={['About', 'Battles', 'Cards', 'Settings']}
          >
            <AboutTab orderOfBattle={orderOfBattle} />
            <BattlesTab battles={battles} orderOfBattle={orderOfBattle} />
            <CardsTab cards={crusadeCards} orderOfBattle={orderOfBattle} />
            <SettingsTab orderOfBattle={orderOfBattle} />
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default OrderOfBattle;
